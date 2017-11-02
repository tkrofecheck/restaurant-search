import React, { Component } from 'react';

export default class Modal extends Component {
	render() {		
		return (
			<div className={this.props.modalClass}>
				{this.props.content}
			</div>
		)
	}
}