import React, { Component } from 'react';

export default class RestaurantPhoto extends Component {
	render() {
		var restaurantStyle = {
			backgroundImage: 'url(' + this.props.url + ')',
			backgroundRepeat: 'no-repeat',
			backgroundSize: 'cover',
		};
		
		return (
			<div className="Restaurant-photo" style={restaurantStyle}></div>
		)
	}
}