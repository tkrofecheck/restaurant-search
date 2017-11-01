import React, { Component } from 'react';
import formatPhoneNumber from '../utils/formatPhoneNumber';

export default class Phone extends Component {	
	render() {
		return (
			<div className="phone">
				{formatPhoneNumber(this.props.number)}
			</div>
		);
	}
}