import React, { Component } from 'react';
import Image from './image';
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
			style: null,
			dataType: null
		};
		var grade;

		switch (this.props.value) {
			case 'A':
				imageAttributes = {
					src: gradeA,
					alt: 'Grade A',
					dataType: this.props.value
				};
				grade = <Image attr={imageAttributes} />;
				break;

			case 'B':
				imageAttributes = {
					src: gradeB,
					alt: 'Grade B',
					dataType: this.props.value
				};
				grade = <Image attr={imageAttributes} />;
				break;

			case 'C':
				imageAttributes = {
					src: gradeC,
					alt: 'Grade C',
					dataType: this.props.value
				};
				grade = <Image attr={imageAttributes} />;
				break;

			default:
				imageAttributes = {
					src: gradeGP,
					alt: 'Grade Pending',
					dataType: this.props.value
				};
				grade = <Image attr={imageAttributes} />;
				break;
		}

		return (
			<div className="grade-image">{grade}</div>
		);
	}
}