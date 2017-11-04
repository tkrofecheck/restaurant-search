import React, { Component } from 'react';
import formatDate from '../utils/formatDate';

export default class MyDate extends Component {
	render() {
		var iDate = formatDate(this.props.date);

		return (
			<div className="date">
				<span className="month">{iDate.month}</span>
				<span className="date-date">{iDate.date}</span>
				<span className="year">{iDate.year}</span>
			</div>
		);
	}
}