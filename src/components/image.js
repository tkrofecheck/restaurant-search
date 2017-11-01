import React, { Component } from 'react';

export default class Image extends Component {
	render() {
		return (
			<img src={this.props.src} className={this.props.className} alt={this.props.alt} style={this.props.style}/>
		);
	}
}