import React, { Component } from 'react';

export default class Address extends Component {
	render() {
		return (
			<div className="address">
				<span className="number">{this.props.building}</span>
				<span className="street">{this.props.street}</span>
				<span className="city">{this.props.boro}</span>
				<span className="state">NY</span>
				<span className="zipcode">{this.props.zipcode}</span>
			</div>
		);
	}
}