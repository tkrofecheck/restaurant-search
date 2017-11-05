import React, { Component } from 'react';
import Address from './address';
import Phone from './phone';

export default class RestaurantMoreInfo extends Component {
	render() {
		var restaurant = this.props.data;
		
		return (
			<div className="restaurant-info">
				<div className="name">{restaurant.name}</div>
				<div className="cuisine">
					{restaurant.cuisine}-$$$$
				</div>
				<div className="address">
					<Address
						building={restaurant.building}
						street={restaurant.street}
						boro={restaurant.boro}
						state={restaurant.state}
						zip={restaurant.state}
						phone={restaurant.phone}
					/>
					<Phone number={restaurant.phone} />
				</div>
			</div>
		)
	}
}