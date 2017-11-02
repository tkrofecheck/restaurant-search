import React, { Component } from 'react';
import Image from './image';
import MyDate from './myDate';
import _isUndefined from 'lodash/fp/isUndefined';
import gradeA from '../images/letters/a.png';
import gradeB from '../images/letters/b.png';
import gradeC from '../images/letters/c.png';
import gradeGP from '../images/letters/GP.png';

export default class Grade extends Component {
	render() {
		var imageAttributes = {
			alt: null,
			className: null,
			src: null,
			style: null
		};
		var sealAttributes = {
			alt: 'NYC Seal',
			className: null,
			src: this.props.seal,
			style: null
		};

		var grade;
		var date;

		switch (this.props.value) {
			case 'A':
				imageAttributes = {
					src: gradeA,
					alt: 'Grade A'
				};
				grade = <Image attr={imageAttributes} />;
				break;

			case 'B':
				imageAttributes = {
					src: gradeB,
					alt: 'Grade B'
				};
				grade = <Image attr={imageAttributes} />;
				break;

			case 'C':
				imageAttributes = {
					src: gradeC,
					alt: 'Grade C'
				};
				grade = <Image attr={imageAttributes} />;
				break;

			default:
				imageAttributes = {
					src: gradeGP,
					alt: 'Grade Pending'
				};
				grade = <Image attr={imageAttributes} />;
				break;
		}

		if (!_isUndefined(this.props.inspectionDate) && this.props.inspectionDate !== null) {
			date = <MyDate date={this.props.inspectionDate} />;
		}

		return (
			<div className={this.props.className}>
				<div className="seal"><Image attr={sealAttributes} /></div>
				<div className="gradeImage">{grade}</div>
				{date}
			</div>
		);
	}
}