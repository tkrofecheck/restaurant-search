import React, { Component } from 'react';

export default class Image extends Component {
	render() {
		return (
			<img src={this.props.attr.src} className={this.props.attr.className} alt={this.props.attr.alt} style={this.props.attr.style} data-type={this.props.attr.dataType} />
		);
	}
}