import React, { Component } from 'react';
import formatDate from '../utils/formatDate';

export default class InspectionDate extends Component {
	render() {
		if (this.props.display === 'true') {
			var iDate = formatDate(this.props.date);

			return (
				<div className="Inspection-date" data-month={iDate.month} data-date={iDate.date} data-year={iDate.year}></div>
			);
		} else {
			return null;
		}
	}
}