import React, { Component } from 'react';
import Image from './image';
import SearchBox from './searchBox';
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
			<header className="App-header" data-type="home">
				<Image attr={imageAttributes} />
				<SearchBox />
			</header>
		);
	}
}
