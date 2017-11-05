import React, { Component } from 'react';
import Image from './image';
import logo from '../images/logos/thomas_logo.png';

export default class AppHeader extends Component {
	render() {
		var imageAttributes = {
            alt: "Thomas Logo",
            className: null,
            src: logo,
            style: null
        }
        
        return (
			<header className="app-header" data-type="home">
				<Image attr={imageAttributes} />
			</header>
		);
	}
}
