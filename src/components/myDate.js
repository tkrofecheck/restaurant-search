import React, { Component } from 'react';
import formatDate from '../utils/formatDate';

export default class MyDate extends Component {
	render() {
		var iDate = formatDate(this.props.date);

		return (
			<div className="date">
				<span class="month">{iDate.month}</span>
				<span class="date-date">{iDate.date}</span>
				<span class="year">{iDate.year}</span>
			</div>
		);
	}
}