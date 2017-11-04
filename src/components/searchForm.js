import React, { Component } from 'react';
import autoBind from 'react-autobind';
import { Button, Form, FormControl } from 'react-bootstrap';
import Restaurants from './restaurants';
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

		var gradesBackground = {
			backgroundImage: 'url(' + gradeBgStart + ')',
			backgroundRepeat: 'no-repeat',
			backgroundSize: 'cover'
		};

		this.state = {
			gradesBackground: gradesBackground,
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

	_handleKeyPress(event) {
		if (event.key === 'Enter') {
			this.handleSubmit(event);
		}
	}

	handleSubmit(event) {
		event.preventDefault();

		var _this = this;

		request
			.get(api.url)
			.query({ q: this.state.searchQuery }) // query string
			.set('X-API-Key', api.key)
			.end((err, res) => {
				if (err) throw err;

				var data = res.body;
				
				console.log('response', res);
				_this.setState({
					response: true,
					responseData: data
				});
				_this.setState({ view : 'results' });
				_this.setState({ searchType: data[0].cuisine });
				_this.setState({ searchBackground: 'url(' + data[data.length-1].imageUrl + ') no-repeat' });
				_this.setState({ gradesBackground: null });
			});
	}

	render() {
		var searchFormStyle = {
			background: this.state.searchBackground
		};

		return (
			<div className="Restaurant-search" view={this.state.view}>
				<div
					className="jumbotron Search-form"
					style={searchFormStyle}
					data-type={this.state.searchType}
				>
					<div className="title">NYC Restaurants</div>
					<Form inline>
						<div className="row">
							<div className="col-lg-12">
								<div className="input-group">
									<div className="input-group-btn">
										<FormControl
											componentClass="select"
											placeholder="all"
											bsStyle="default"
											bsSize="large"
											id="searchFilter"
											onSelect={event =>
												this.handleGradeType(event)}
										>
											<option value="all">All</option>
										</FormControl>
										<FormControl
											type="text"
											bsSize="large"
											id="searchQuery"
											value={this.state.searchQuery}
											onChange={event =>
												this.handleInputChange(event)}
											onKeyPress={event =>
												this._handleKeyPress(event)}
										/>
									</div>
								</div>
								<Button
									bsStyle="success"
									bsSize="large"
									onClick={this.handleSubmit}
								>
									Search
								</Button>
								<div className="search-type">
									<div className="search-label">
										<span>Search:</span>
									</div>
									<div className="search-cuisine">
										<span data-value={this.state.searchType}>Restaurants</span>
									</div>
								</div>
							</div>
						</div>
					</Form>
				</div>
				<div className="Search-results">
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
