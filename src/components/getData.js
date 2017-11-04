import React, { Component } from 'react';
import autoBind from 'react-autobind';
import Restaurants from './restaurants';

/* Installed globally */
const request = require('superagent');

export default class GetData extends Component {
	constructor(props) {
		super(props);

		this.state = {
			response: false,
			responseData: []
		};

		autoBind(this);
	}

	componentDidMount() {
		window.addEventListener('load', this.handleLoad);
	}

	handleLoad(event) {
		var _this = this;

		if (this.props.query) {
			request
				.get('https://restaurant-service.tpco.info/restaurants')
				.query({ q: this.props.query }) // query string
				.set('X-API-Key', 'GC25gGvU068FNzk16wkfN8vK6JmzsKfk6BsYzhpb')
				.end((err, res) => {
					if (err) throw err;

					_this.setState({
						response: true,
						responseData: res.data
					});
				});
		}
	}

	render() {
		return (
			<Restaurants
				data={this.state.responseData}
				response={this.state.response}
			/>
		);
	}
}
