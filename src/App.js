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
	render() {
		var element;
		var divStyle;

		switch (this.props.value) {
			case 'A':
				element = <Image src={gradeA} alt="Grade A" />;
				break;

			case 'B':
				element = <Image src={gradeB} alt="Grade B" />;
				break;

			case 'C':
				element = <Image src={gradeC} alt="Grade C" />;
				break;

			default:
				element = <Image src={gradeGP} alt="Grade Pending" />;
				break;
		}

		divStyle = {
			backgroundImage : (this.props.color === 'blue') ? 'url(' + blueSeal + ')' : 'url(' + greySeal + ')'
		};

		return <div class="nyc-seal" style={divStyle}>{element}</div>;
	}
}

class Restaurant extends Component {
	render() {
		var info = this.props.info;

		return (
			<div className="Restaurant">
				<div className="name">{info.name}</div>
				<div className="address">
					<div className="street">
						{info.building}&nbsp;{info.street}
					</div>
					<div className="boro">
						{info.boro},&nbsp;NY&nbsp;{info.zipcode}
					</div>
				</div>
				<div className="inspection-grade">
					<Grade value={info.inspections[0].grade} />
				</div>
			</div>
		);
	}
}

class SearchForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			searchFilter: 'all',
			searchPage: '1',
			searchQuery: '',
			searchResults: (
				<div className="Letter-grades">
					<Grade value="A" color="blue" />
					<Grade value="B" color="blue" />
					<Grade value="C" color="blue" />
					<Grade value="D" color="blue" />
				</div>
			)
		};

		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleInputChange(event) {
		var target = event.target;
		var value = target.value;
		var name = target.name;

		this.setState({
			[name]: value
		});
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
				console.log('restaurants', data);

				let restaurants = data.map(function(restaurant) {
					return <Restaurant info={restaurant} />;
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
					<div className="row">
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
			<img
				src={this.props.src}
				className={this.props.className}
				alt={this.props.alt}
			/>
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
