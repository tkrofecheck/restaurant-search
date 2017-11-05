import React, { Component } from 'react';
import MyDate from './myDate';

export default class InspectionInfo extends Component {
	render() {
		return (
			<div className="inspection-info">
				<div className="heading">Inspections</div>
				<div className="grade-date bold">
					<MyDate date={this.props.data.grade_date} />
				</div>
				<div className="violation">
					<div className="action">{this.props.data.action}</div>
					<span>Violation code: {this.props.data.violation_code}</span>
					<span>{this.props.data.violation_desc}</span>
				</div>
				<div className="score">
					Score: {this.props.data.score}
				</div>
				<div className="grade">Grade: {this.props.data.grade}</div>
				<div className="grade-date">
					Grade Date: <MyDate date={this.props.data.grade_date} />
				</div>
				<div className="type">
					{this.props.data.inspection_type}
				</div>
			</div>
		);
	}
}
