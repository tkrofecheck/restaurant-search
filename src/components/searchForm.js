import React, { Component } from 'react';
import autoBind from 'react-autobind';
import Restaurants from './restaurants';
import SearchBox from './searchBox';
import gradeBgStart from '../images/restaurants/image_7.jpg';

/* Installed globally */
const request = require('superagent');
const api = {
	url: 'https://restaurant-service.tpco.info/restaurants',
	key: 'GC25gGvU068FNzk16wkfN8vK6JmzsKfk6BsYzhpb'
};

export default class SearchForm extends Component {
	constructor(props) {
		super(props);

		this.state = {
			gradesBackground: {
				backgroundImage: 'url(' + gradeBgStart + ')',
				backgroundRepeat: 'no-repeat',
				backgroundSize: 'cover'
			},
			querySubmit: null,
			response: false,
			responseData: [],
			search: [],
			searchType: 'search',
			searchBackground: null,
			searchFilter: 'all',
			searchPage: '1',
			searchQuery: '',
			view: 'home'
		};

		autoBind(this);
	}

	handleGradeType(event) {
		event.stopPropagation();
		
		var value = event.target.value;
		
		this.setState({
			searchFilter: value
		});
	}

	handleInputChange(event) {
		event.stopPropagation();
		
		var target = event.target;
		var value = target.value;
		var name = target.id;

		this.setState({
			[name]: value
		});
	}

	_handleKeyPress(event) {
		event.stopPropagation();
		
		if (event.key === 'Enter') {
			this.handleSubmit(event);
		}
	}

	handleSubmit(event) {
		event.preventDefault();
		event.stopPropagation();

		var _this = this;

		request
			.get(api.url)
			.query({ q: this.state.searchQuery }) // query string
			.set('X-API-Key', api.key)
			.end((err, res) => {
				if (err) throw err;

				var data = res.body;

				_this.setState({
					response: true,
					responseData: data
				});
				_this.setState({ view: 'results' });
				_this.setState({ searchType: data[0].cuisine });
				_this.setState({
					searchBackground:
						'url(' + data[data.length - 1].imageUrl + ') no-repeat'
				});
				_this.setState({ gradesBackground: null });
			});
	}

	render() {
		var searchFormStyle = {
			background: this.state.searchBackground
		};

		var searchEvents = {
			onselect: (event) => this.handleGradeType(event),
			oninputchange: (event) => this.handleInputChange(event),
			onkeypress: (event) => this._handleKeyPress(event),
			onsubmit: (event) => this.handleSubmit(event)
		};

		return (
			<div className="app-body" view={this.state.view}>
				<div
					className="jumbotron search-form"
					style={searchFormStyle}
					data-type={this.state.searchType}
				>
					<div className="title">NYC Restaurants</div>
					<SearchBox events={searchEvents} searchType={this.state.searchType} searchQuery={this.state.searchQuery} />
					<div className="search-type">
						<div className="search-label">
							<span>Search:</span>
						</div>
						<div className="search-cuisine">
							<span data-value={this.state.searchType}>
								Restaurants
							</span>
						</div>
					</div>
				</div>
				<div className="search-results">
					<div
						className="jumbotron"
						style={this.state.gradesBackground}
					>
						<Restaurants
							data={this.state.responseData}
							response={this.state.response}
						/>
					</div>
				</div>
			</div>
		);
	}
}
