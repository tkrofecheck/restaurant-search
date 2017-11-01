import React, { Component } from 'react';

export default class InspectionDate extends Component {
	render() {
		if (this.props.display === 'true') {
			var inspectionDate = new Date(this.props.date);
			var date = inspectionDate.getDate();
			var month = inspectionDate.getMonth() + 1;
			var year = inspectionDate.getFullYear();
			
			function addZero(num) {
				return (num < 10) ? '0' + num : num
			}

			date = addZero(date);
			month = addZero(month);

			return (
				<div className="Inspection-date" data-month={month} data-date={date} data-year={year}></div>
			);
		} else {
			return null;
		}
	}
}