import React, { Component } from 'react';
import { Button, Form, FormControl } from 'react-bootstrap';
import autoBind from 'react-autobind';
import _isUndefined from 'lodash/fp/isUndefined';
import _map from 'lodash/map';

/*
// Needed for Redux - try to implement later
import { connect, Provider } from 'react-redux';
import { createStore } from 'redux';
*/

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

class InspectionDate extends Component {
	render() {
		if (this.props.display === 'true') {
			var inspectionDate = new Date(this.props.date);
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
		} else {
			return null;
		}
	}
}

class Grade extends Component {
	render() {
		var inspection = this.props.inspection;
		var value = !_isUndefined(inspection) ? inspection.grade : this.props.value;
		var grade;
		var date;

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

		if (!_isUndefined(inspection)) {
			date = <InspectionDate date={inspection.date} display={this.props.showDate} />;
		}

		return (
			<div className={this.props.className} style={this.props.containerStyle}>
				{grade}
				{date}
			</div>
		);
	}
}

class Phone extends Component {
	constructor(props) {
		super(props);
		autoBind(this);
	}
	
	formatPhoneNumber(s) {
		var s2 = (""+s).replace(/\D/g, '');
		var m = s2.match(/^(\d{3})(\d{3})(\d{4})$/);
		return (!m) ? null : "(" + m[1] + ") " + m[2] + "-" + m[3];
	}
	
	render() {
		return (
			<div className="phone">
				{this.formatPhoneNumber(this.props.number)}
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
				<Phone number={this.props.phone} />
			</div>
		);
	}
}

class RestaurantPhoto extends Component {
	render() {
		var restaurantStyle = {
			backgroundImage: 'url(' + this.props.url + ')',
			backgroundRepeat: 'no-repeat',
			backgroundSize: 'cover',
		};
		
		return (
			<div className="Restaurant-photo" style={restaurantStyle}></div>
		)
	}
}

class RestaurantMoreInfo extends Component {
	render() {
		var data = this.props.data;
		var gradeStyle = {
			display: 'flex',
			alignSelf: 'center',
			justifySelf: 'center',
			width: '75%',
			maxWidth: '90px'
		};

		var containerStyle = {
			backgroundImage: 'url(' + blueSeal + ')',
			backgroundPosition: 'center',
			backgroundRepeat: 'no-repeat',
			backgroundSize: 'contain',
			height: '120px',
			display: 'flex',
			justifyContent: 'center'
		};
		
		return (
			<div className="Restaurant-moreinfo">
				<RestaurantPhoto url={data.imageUrl}/>
				<div className="pad-20">
					<div className="Restaurant-info">
						<div className="Restaurant-contact">
							<div className="Restaurant-name">{data.name}</div>
							<div className="Restaurant-cuisine">{data.cuisine}-$$$$</div>
							<div className="Restaurant-address">
								<Address building={data.building} street={data.street} boro={data.boro} state={data.state} zip={data.state} phone={data.phone}/>
							</div>
						</div>
						<div className="Restaurant-inspection">
							<Grade inspection={data.inspections[0]} gradeStyle={gradeStyle} containerStyle={containerStyle} showDate="false"/>
						</div>
					</div>
				</div>
				<div className="Restaurant-inspection-info">
					<div className="Inspection-heading">Inspections</div>
					<InspectionDate date={data.inspections[0].date} display="true"/>
				</div>
			</div>
		)
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
			display: 'flex',
			justifyContent: 'center',
			alignItems: 'center',
			margin: '0 auto'
		};

		let initialStateResults = _map(gradeLetters, function(letter, index) {
			return (
				<div key={index} className="col-sm-6 col-md-3">
					<Grade value={letter} gradeStyle={gradeStyle} containerStyle={containerStyle} className="def_gradeLetter" showDate="false" />
				</div>
			);
		});

		this.state = {
			gradesBackground: gradesBackground,
			searchType: 'search',
			searchBackground: 'rgb(17,61,89)',
			searchFilter: 'all',
			searchPage: '1',
			searchQuery: '',
			searchResults: (
				<div className="row Letter-grades">
					{initialStateResults}
				</div>
			),
			modalClass: 'Restaurant-modal hidden',
			restaurantContent: ( 
				<div></div>
			)
		};

		autoBind(this);
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
			</div>
		);
	}

	showRestaurantDetails(event, content, display) {
		event.stopPropagation();

		var _this = this;
		var modalClass = 'Restaurant-modal';
		
		if (display) {
			modalClass = 'Restaurant-modal show'
			this.setState({ restaurantContent:
				<div className="Restaurant-details">
					<div className="close" onClick={(event) => _this.showRestaurantDetails(event, null, false)}>Close</div>
					<RestaurantMoreInfo data={content} />
				</div>
			},function() {
				this.setState({ modalClass: modalClass });

				setTimeout(function() {
					modalClass = 'Restaurant-modal show visible';
					this.setState({ modalClass: modalClass });
				}.bind(this), 10);
			}.bind(this));
		} else {
			modalClass = 'Restaurant-modal show';
			this.setState({ restaurantContent:
				<div></div>
			},function() {
				this.setState({ modalClass: modalClass });

				setTimeout(function() {
					modalClass = 'Restaurant-modal';
					this.setState({ modalClass: modalClass });
				}.bind(this), 510); // Keep timeout slightly higher than transition time of 500ms

			}.bind(this));
		}

	}

	_handleKeyPress(event) {
		if (event.key === 'Enter') {
			this.handleSubmit(event);
		}
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
				var gradeStyle;
		
				var containerStyle = {
					backgroundImage: 'url(' + greySeal + ')'
				};

				let restaurants = data.map(function(restaurant, index) {
					gradeStyle = {
						position: 'relative',
						display: 'block',
						width: (restaurant.inspections[0].grade === 'B') ? '44%' : '50%',
						top: (restaurant.inspections[0].grade === 'A' || restaurant.inspections[0].grade === 'B' || restaurant.inspections[0].grade === 'C') ? '10%' : '20%'
					};

					return (
						<div key={index} className="col-sm-4" onClick={(event) => _this.showRestaurantDetails(event, restaurant, true)}>
							<RestaurantPhoto url={restaurant.imageUrl} />
							<div className="Restaurant-inspection">
								<Grade className="tile_gradeLetter" inspection={restaurant.inspections[0]} gradeStyle={gradeStyle} containerStyle={containerStyle} showDate="true" />
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

				_this.setState({ searchType: data[0].cuisine });
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
		
		return (
			<div className="Restaurant-search">
				<div className="jumbotron Search-form" style={searchFormStyle} data-type={this.state.searchType}>
					<div className="title">NYC Restaurants</div>
					<Form inline>
						<div className="row">
							<div className="col-lg-12">
								<div className="input-group">
									<div className="input-group-btn">
										<FormControl componentClass="select" placeholder="all" bsStyle="default" bsSize="large" id="searchFilter" onSelect={(event) => this.handleGradeType(event)}>
											<option value="all">All</option>
										</FormControl>
										<FormControl type="text" bsSize="large" id="searchQuery" value={this.state.searchQuery} onChange={(event) => this.handleInputChange(event)} onKeyPress={(event) => this._handleKeyPress(event)} />
    								</div>
 								</div>
								 <Button bsStyle="success" bsSize="large" onClick={this.handleSubmit}>Search</Button>
								<div className="search-type">
									<div className="search-label"><span>Search:</span></div>
									<div className="search-cuisine"><span data-value={this.state.searchType}>Restaurants</span></div>
								</div>
							</div>
						</div>
					</Form>
				</div>
				<div className="Search-results">
					<div className="jumbotron" style={this.state.gradesBackground}>
						{this.state.searchResults}
					</div>
				</div>
				<Modal content={this.state.restaurantContent} modalClass={this.state.modalClass} />
			</div>
		);
	}
}

class SearchBox extends Component {
	render() {
		return (
			<div className="Restaurant-searchbox"></div>
		)
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
				{this.props.content}
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
					<SearchBox />
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
