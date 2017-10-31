import React, { Component } from 'react';
import { Button, DropdownButton, Form, FormControl, MenuItem } from 'react-bootstrap';
import logo from './images/logos/thomas_logo.png';
import gradeA from './images/letters/a.png';
import gradeB from './images/letters/b.png';
import gradeC from './images/letters/c.png';
import gradeGP from './images/letters/GP.png';
import gradeBgStart from './images/restaurants/image_7.jpg';
import blueSeal from './images/seals/Nyc-seal-blue.png';
import greySeal from './images/seals/Seal_of_New_York_City_BW.png';
import './App.css';

const apiKey = 'GC25gGvU068FNzk16wkfN8vK6JmzsKfk6BsYzhpb';
const gradeLetters = ['A','B','C','GP'];

function formatPhoneNumber(s) {
	var s2 = (""+s).replace(/\D/g, '');
	var m = s2.match(/^(\d{3})(\d{3})(\d{4})$/);
	return (!m) ? null : "(" + m[1] + ") " + m[2] + "-" + m[3];
}

class Grade extends Component {
	inspectionDate(inspection) {
		if (typeof inspection !== 'undefined') {
			var inspectionDate = new Date(inspection.date);
			var date = inspectionDate.getDate();
			var month = inspectionDate.getMonth() + 1;
			var year = inspectionDate.getFullYear();
			
			function addZero(num) {
				return (num < 10) ? '0' + num : num
			}

			date = addZero(date);
			month = addZero(month);

			return (
				<div className="Inspection-date" data-month={month} data-date={date} data-year={year}></div>
			);
		}
	}
	
	render() {
		var inspection = this.props.inspection;
		var value = (typeof inspection !== 'undefined') ? inspection.grade : this.props.value;
		var grade;

		switch (value) {
			case 'A':
				grade = <Image src={gradeA} alt="Grade A" style={this.props.gradeStyle} />;
				break;

			case 'B':
				grade = <Image src={gradeB} alt="Grade B" style={this.props.gradeStyle} />;
				break;

			case 'C':
				grade = <Image src={gradeC} alt="Grade C" style={this.props.gradeStyle} />;
				break;

			default:
				grade = <Image src={gradeGP} alt="Grade Pending" style={this.props.gradeStyle} />;
				break;
		}

		

		return (
			<div className={this.props.classNames} style={this.props.containerStyle}>
				{grade}
				{this.inspectionDate(inspection)}
			</div>
		);
	}
}

class Address extends Component {
	render() {
		return (
			<div>
				<div className="address">
					{this.props.building}&nbsp;{this.props.street},&nbsp;{this.props.boro},&nbsp;NY&nbsp;{this.props.zipcode}
				</div>
				<div className="phone">
					{formatPhoneNumber(this.props.phone)}
				</div>
			</div>
		);
	}
}

class SearchForm extends Component {
	constructor(props) {
		super(props);

		var gradeStyle = {
			display: 'flex',
			alignSelf: 'center',
			justifySelf: 'center',
			width: '30%'
		};

		var gradesBackground = {
			backgroundImage: 'url(' + gradeBgStart + ')',
			backgroundRepeat: 'no-repeat',
			backgroundSize: 'cover'
		};

		var containerStyle = {
			backgroundColor: '#ffffff',
			backgroundImage: 'url(' + blueSeal + ')',
			backgroundPosition: 'center center',
			backgroundRepeat: 'no-repeat',
			backgroundSize: '60%',
			height: '200px',
			maxWidth: '200px',
			display: 'flex',
			justifyContent: 'center',
			alignItems: 'center',
			margin: '0 auto'
		};

		let initialStateResults = gradeLetters.map(function(letter, index) {
			return (
				<div key={index} className="col-sm-6 col-md-3">
					<Grade value={letter} gradeStyle={gradeStyle} containerStyle={containerStyle} />
				</div>
			);
		});

		this.state = {
			gradesBackground: gradesBackground,
			resultsFound: false,
			searchBackground: 'rgb(17,61,89)',
			searchFilter: 'all',
			searchPage: '1',
			searchQuery: '',
			searchResults: (
				<div className="row Letter-grades">
					{initialStateResults}
				</div>
			),
			modalClass: 'Modal hidden',
			restaurantId: null
		};

		this.handleGradeType = this.handleGradeType.bind(this);
		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.showRestaurantDetails = this.showRestaurantDetails.bind(this);
	}

	handleGradeType(value) {
		this.setState({
			searchFilter: value
		});
	}

	handleInputChange(event) {
		var target = event.target;
		var value = target.value;
		var name = target.id;

		this.setState({
			[name]: value
		});
	}

	wrapRestuarants(restaurants) {
		return (
			<div>
				<div className="row">{restaurants}</div>
				<Modal id={this.state.restaurantId} modalClass={this.state.modalClass} />
			</div>
		);
	}

	showRestaurantDetails(event, id, display) {
		event.stopPropagation();
		
		console.log(id);

		var modalClass;
		
		if (display) {
			modalClass = 'Modal';
			this.setState({ restaurantId: id });
		} else {
			modalClass = 'Modal hidden';
			this.setState({ restaurantId: null });
		}

		console.log(modalClass);

		this.setState({ modalClass: modalClass });
	}

	handleSubmit(event) {
		event.preventDefault(); // prevent default form submit

		var _this = this;
		var paramString = '?q=' + this.state.searchQuery;
		var request = new XMLHttpRequest();

		request.open(
			'GET',
			'https://restaurant-service.tpco.info/restaurants' + paramString
		);
		request.setRequestHeader('X-Api-Key', apiKey);

		request.onreadystatechange = function() {
			if (this.readyState === 4) {
				var data = JSON.parse(this.responseText);
				//console.log('restaurants', data);

				var restaurantStyle;
				var gradeStyle;
		
				var containerStyle = {
					backgroundColor: '#ffffff',
					backgroundImage: 'url(' + greySeal + ')',
					backgroundPosition: 'center 15%',
					backgroundRepeat: 'no-repeat',
					backgroundSize: '60%',
					width: '100px',
					height: '100px',
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					position: 'absolute',
					right: '30px',
					top: '32%',
					boxShadow: '0px 2px 2px #ababab'
				};				

				let restaurants = data.map(function(restaurant, index) {
					restaurantStyle = {
						backgroundImage: 'url(' + restaurant.imageUrl + ')',
						backgroundRepeat: 'no-repeat',
						backgroundSize: 'cover',
						height: '200px'
					};

					gradeStyle = {
						position: 'relative',
						display: 'block',
						width: (restaurant.inspections[0].grade === 'B') ? '44%' : '50%',
						top: (restaurant.inspections[0].grade === 'A' || restaurant.inspections[0].grade === 'B' || restaurant.inspections[0].grade === 'C') ? '10%' : '20%'
					};

					return (
						<div key={index} className="col-sm-4" onClick={(event) => _this.showRestaurantDetails(event, restaurant._id, true)}>
							<div className="Restaurant-photo" style={restaurantStyle}></div>
							<div className="Restaurant-inspection">
								<Grade inspection={restaurant.inspections[0]} gradeStyle={gradeStyle} containerStyle={containerStyle}/>
							</div>
							<div className="Restaurant-info">
								<div className="Restaurant-name">{restaurant.name}</div>
								<div className="Restaurant-cuisine">{restaurant.cuisine}-$$$$</div>
								<div className="Restaurant-address">
									<Address building={restaurant.building} street={restaurant.street} boro={restaurant.boro} state={restaurant.state} zip={restaurant.state} phone={restaurant.phone}/>
								</div>
							</div>
						</div>
					);
				});

				_this.setState({ resultsFound: true });
				_this.setState({ searchResults: _this.wrapRestuarants(restaurants) });
				_this.setState({ searchBackground: 'url(' + data[data.length-1].imageUrl + ') no-repeat' });
				_this.setState({ gradesBackground: null });
			}
		};

		request.send();
	}

	render() {
		var searchFormStyle = {
			background: this.state.searchBackground
		};

		var resultsClass = 'Search-results';

		if (this.state.resultsFound) {
			resultsClass += ' container-fluid';
		}
		
		return (
			<div className="Restaurant-search">
				<div className="jumbotron Search-form" style={searchFormStyle}>
					<div className="title">NYC Restaurants</div>
					<Form inline>
						<DropdownButton bsStyle="default" title="All" id="searchFilter" onSelect={this.handleGradeType}>
							<MenuItem eventKey="all" active>All</MenuItem>
							<MenuItem eventKey="a">Grade A</MenuItem>
							<MenuItem eventKey="b">Grade B</MenuItem>
							<MenuItem eventKey="c">Grade C</MenuItem>
							<MenuItem eventKey="gp">Grade Pending</MenuItem>
						</DropdownButton>
						<FormControl type="text" id="searchQuery" value={this.state.searchQuery} onChange={this.handleInputChange} />
						<Button bsStyle="success" onClick={this.handleSubmit}>Search</Button>
					</Form>
				</div>
				<div className={resultsClass}>
					<div className="jumbotron" style={this.state.gradesBackground}>
						{this.state.searchResults}
					</div>
				</div>
			</div>
		);
	}
}

class Image extends Component {
	render() {
		return (
			<img src={this.props.src} className={this.props.className} alt={this.props.alt} style={this.props.style}/>
		);
	}
}

class Modal extends Component {	
	render() {		
		return (
			<div className={this.props.modalClass}>
				{this.props.id}
			</div>
		)
	}
}

class App extends Component {
	render() {
		return (
			<div className="App">
				<header className="App-header">
					<Image src={logo} alt="Thomas Logo" />
				</header>
				<SearchForm />
				<footer className="App-footer">
					<Image src={logo} alt="Thomas Logo" />
				</footer>
			</div>
		);
	}
}

export default App;
