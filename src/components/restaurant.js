import React, { Component } from 'react';
import autoBind from 'react-autobind';
import Address from './address';
import Grade from './grade';
import RestaurantPhoto from './restaurantPhoto';
import greySeal from '../images/seals/Seal_of_New_York_City_BW.png';

export default class Restaurant extends Component {
	constructor(props) {
		super(props);

		autoBind(this);
	}

	render() {
        var restaurant = this.props.data;
        
        return (
			<div
				key={this.props.index}
				className="col-sm-4"
				onClick={this.props.onclick}
			>
				<RestaurantPhoto url={restaurant.imageUrl} />
				<div className="Restaurant-inspection">
					<Grade
						className="tile_gradeLetter"
						value={restaurant.inspections[0].grade}
						inspectionDate={restaurant.inspections[0].grade_date}
						seal={greySeal}
					/>
				</div>
				<div className="Restaurant-info">
					<div className="Restaurant-name">{restaurant.name}</div>
					<div className="Restaurant-cuisine">
						{restaurant.cuisine}-$$$$
					</div>
					<div className="Restaurant-address">
						<Address
							building={restaurant.building}
							street={restaurant.street}
							boro={restaurant.boro}
							state={restaurant.state}
							zip={restaurant.state}
							phone={restaurant.phone}
						/>
					</div>
				</div>
			</div>
		);
	}
}
