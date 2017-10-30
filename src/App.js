import React, { Component } from 'react';
import { Button, DropdownButton, Form, FormControl, MenuItem } from 'react-bootstrap';
import logo from './images/logos/thomas_logo.png';
import gradeA from './images/letters/a.png';
import gradeB from './images/letters/b.png';
import gradeC from './images/letters/c.png';
import gradeGP from './images/letters/GP.png';
import blueSeal from './images/seals/Nyc-seal-blue.png';
import greySeal from './images/seals/Seal_of_New_York_City_BW.png';
import './App.css';

const apiKey = 'GC25gGvU068FNzk16wkfN8vK6JmzsKfk6BsYzhpb';

class Grade extends Component {
	inspectionDate(inspection) {
		if (typeof inspection !== 'undefined') {
			var inspectionDate = new Date(inspection.date);
			var date = inspectionDate.getDate();
			var month = inspectionDate.getMonth();
			var year = inspectionDate.getFullYear();
			
			return (
				<div className="Inspection-date">
					{month}-{date}-{year}
				</div>
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
				<div className="street">
					{this.props.building}&nbsp;{this.props.street}
				</div>
				<div className="boro">
					{this.props.boro},&nbsp;NY&nbsp;{this.props.zipcode}
				</div>
			</div>
		);
	}
}

class Restaurant extends Component {
	render() {
		var info = this.props.info;
		var restaurantStyle = {
			backgroundImage: 'url(' + info.imageUrl + ')',
			backgroundRepeat: 'no-repeat',
			backgroundSize: 'cover',
			height: '200px'
		};

		var gradeStyle = {
			width: (function() {
				var percent = '50%';
				
				switch (info.inspections[0].grade) {
					case 'A':
						percent = '50%';
						break;
					case 'B':
						percent = '44%';
						break;
					case 'C':
						percent = '50%';
						break;
					default:
						break;
				}

				return percent;
			})(),
			position: 'relative',
			display: 'block',
			top: (function() {
				if (info.inspections[0].grade === 'A' || info.inspections[0].grade === 'B' || info.inspections[0].grade === 'C') {
					return '10%';
				} else {
					return '20%';
				}
			})()
		};

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
			right: '20px',
			top: '35%',
			boxShadow: '0px 2px 2px #ababab'
		};

		return (
			<div className="col-sm-4">
				<div style={restaurantStyle}></div>
				<div className="Restaurant-inspection">
					<Grade inspection={info.inspections[0]} gradeStyle={gradeStyle} containerStyle={containerStyle}/>
				</div>
				<div className="Restaurant-info">
					<div className="Restaurant-cuisine">{info.cuisine}</div>
					<div className="Restaurant-name">{info.name}</div>
					<div className="Restaurant-address">
						<Address building={info.building} street={info.street} boro={info.boro} state={info.state} zip={info.state}/>
					</div>
				</div>
			</div>
		);
	}
}

class SearchForm extends Component {
	constructor(props) {
		super(props);

		var gradeStyle = {
			width: 'auto'
		};

		var containerStyle = {
			backgroundColor: '#ffffff',
			backgroundImage: 'url(' + blueSeal + ')',
			backgroundPosition: 'center center',
			backgroundRepeat: 'no-repeat',
			backgroundSize: '60%',
			height: '200px',
			display: 'flex',
			justifyContent: 'center',
			alignItems: 'center'
		};

		this.state = {
			searchFilter: 'all',
			searchPage: '1',
			searchQuery: '',
			searchResults: (
				<div className="row Letter-grades">
					<div className="col-sm-3">
						<Grade value="A" gradeStyle={gradeStyle} containerStyle={containerStyle} />
					</div>
					<div className="col-sm-3">
						<Grade value="B" gradeStyle={gradeStyle} containerStyle={containerStyle} />
					</div>
					<div className="col-sm-3">
						<Grade value="C" gradeStyle={gradeStyle} containerStyle={containerStyle} />
					</div>
					<div className="col-sm-3">
						<Grade value="GP" gradeStyle={gradeStyle} containerStyle={containerStyle}/>
					</div>
				</div>
			)
		};

		this.handleGradeType = this.handleGradeType.bind(this);
		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
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

	handleSubmit(event) {
		event.preventDefault(); // prevent default form submit

		var _this = this;
		var paramString = '?q=' + this.state.searchQuery + '&limit=13';
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

				let restaurants = data.map(function(restaurant, index) {
					return <Restaurant info={restaurant} key={index} index={index} />;
				});

				_this.setState({ searchResults: restaurants });
			}
		};

		request.send();
	}

	render() {
		return (
			<div className="Restaurant-search">
				<div className="jumbotron Search-form">
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
				<div className="container Search-results">
					{this.state.searchResults}
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
