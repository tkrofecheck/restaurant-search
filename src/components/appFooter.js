import React, { Component } from 'react';
import Image from './image';
import logo from '../images/logos/thomas_logo.png';

export default class AppFooter extends Component {
	render() {
		var imageAttributes = {
            alt: "Thomas Logo",
            className: null,
            src: logo,
            style: null
        }
        
        return (
			<footer className="app-footer">
				<Image attr={imageAttributes} />
			</footer>
		);
	}
}
