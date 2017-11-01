import React, { Component } from 'react';
import autoBind from 'react-autobind';
import { Button, Form, FormControl } from 'react-bootstrap';
import _map from 'lodash/map';
import Grade from './grade';
import Address from './address';
import RestaurantMoreInfo from './restaurantInfo';
import RestaurantPhoto from './restaurantPhoto';
import Modal from './modal';
import gradeBgStart from '../images/restaurants/image_7.jpg';
import blueSeal from '../images/seals/Nyc-seal-blue.png';
import greySeal from '../images/seals/Seal_of_New_York_City_BW.png';

const gradeLetters = ['A','B','C','GP'];

export default class SearchForm extends Component {
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
				<Form inline>
					<div className="row Filters">
						<div className="col-lg-12">
							<div className="input-group">
								<div className="input-group-btn">
									<FormControl componentClass="select" placeholder="all" bsStyle="info" bsSize="small" name="grade">
										<option value="all">Grade</option>
										<option value="a">Grade A</option>
										<option value="b">Grade B</option>
										<option value="c">Grade C</option>
										<option value="gp">Grade Pending</option>
									</FormControl>
									<FormControl componentClass="select" placeholder="all" bsStyle="info" bsSize="small" name="price">
										<option value="all">Price</option>
										<option value="1">$</option>
										<option value="2">$$</option>
										<option value="3">$$$</option>
										<option value="4">$$$$</option>
									</FormControl>
								</div>
							</div>
						</div>
					</div>
				</Form>
				<div className="row">
					{restaurants}
				</div>
			</div>
		);
	}

	showRestaurantDetails(event, content, display) {
		event.stopPropagation();

		var _this = this;
		var modalClass = 'Restaurant-modal';
		
		if (display) {
			modalClass = 'Restaurant-modal show';
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
		request.setRequestHeader('X-Api-Key', this.props.apiKey);

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
				_this.setState({ searchResults: _this.wrapRestuarants(restaurants) }, function() {
					document.getElementsByTagName('body')[0].classList.remove('start');
				});
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