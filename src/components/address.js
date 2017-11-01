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
					{this.props.building}&nbsp;{this.props.street},&nbsp;{this.props.boro},&nbsp;NY&nbsp;{this.props.zipcode}
				</div>
				<Phone number={this.props.phone} />
			</div>
		);
	}
}