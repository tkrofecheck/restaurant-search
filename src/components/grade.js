import React, { Component } from 'react';
import Image from './image';
import InspectionDate from './inspectionDate';
import _isUndefined from 'lodash/fp/isUndefined';
import gradeA from '../images/letters/a.png';
import gradeB from '../images/letters/b.png';
import gradeC from '../images/letters/c.png';
import gradeGP from '../images/letters/GP.png';

export default class Grade extends Component {
	render() {
		var inspection = this.props.inspection;
		var value = !_isUndefined(inspection) ? inspection.grade : this.props.value;
		var imageAttributes = {
			alt: null,
			className: null,
			src: null,
			style: null
		};
		var grade;
		var date;

		switch (value) {
			case 'A':
				imageAttributes = {
					src: gradeA,
					alt: 'Grade A',
					style: this.props.gradeStyle
				};
				grade = <Image attr={imageAttributes} />;
				break;

			case 'B':
				imageAttributes = {
					src: gradeB,
					alt: 'Grade B',
					style: this.props.gradeStyle
				};
				grade = <Image attr={imageAttributes} />;
				break;

			case 'C':
				imageAttributes = {
					src: gradeC,
					alt: 'Grade C',
					style: this.props.gradeStyle
				};
				grade = <Image attr={imageAttributes} />;
				break;

			default:
				imageAttributes = {
					src: gradeGP,
					alt: 'Grade Pending',
					className: null,
					style: this.props.gradeStyle
				};
				grade = <Image attr={imageAttributes} />;
				break;
		}

		if (!_isUndefined(inspection)) {
			date = <InspectionDate date={inspection.date} display={this.props.showDate} />;
		}

		return (
			<div className={this.props.className} style={this.props.containerStyle}>
				{grade}
				{date}
			</div>
		);
	}
}