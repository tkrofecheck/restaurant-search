import React, { Component } from 'react';
import Grade from './grade';
import InspectionSeal from './inspectionSeal';
import MyDate from './myDate';

export default class InspectionGrade extends Component {
	render() {
		// Styles needed for inspection grade inside modal
		/*var gradeStyle = {
			display: 'flex',
			alignSelf: 'center',
			justifySelf: 'center',
			width: '75%',
			maxWidth: '90px'
		};

		var containerStyle = {
			backgroundImage: 'url(' + blueSeal + ')',
			backgroundPosition: 'center',
			backgroundRepeat: 'no-repeat',
			backgroundSize: 'contain',
			height: '120px',
			display: 'flex',
			justifyContent: 'center'
		};*/
		return (
			<div className="grade-letter-container">
				<InspectionSeal value={this.props.seal} />
				<Grade value={this.props.grade} />
				<MyDate date={this.props.date} />
			</div>
		);
	}
}
