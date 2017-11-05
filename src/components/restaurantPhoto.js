import React, { Component } from 'react';
import Image from './image';

export default class RestaurantPhoto extends Component {
	render() {
		var restaurantStyle = {
			className: null,
			src: this.props.url,
			alt: this.props.alt,
			style: null
		};
		
		return (
			<div className="photo">
				<Image attr={restaurantStyle} />
			</div>
		)
	}
}