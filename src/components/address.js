import React, { Component } from 'react';
import Phone from './phone';

/*
    Component expect the following properties:
    building, street, boro, zipcode, phone
*/

export default class Address extends Component {
	render() {
		return (
			<div>
				<div className="address">
					<span className="number">{this.props.building}</span>
					<span className="street">{this.props.street}</span>
					<span className="city">{this.props.boro}</span>
					<span className="state">NY</span>
					<span className="zipcode">{this.props.zipcode}</span>
				</div>
				<Phone number={this.props.phone} />
			</div>
		);
	}
}