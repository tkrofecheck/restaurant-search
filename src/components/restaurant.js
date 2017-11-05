import React, { Component } from 'react';
import autoBind from 'react-autobind';
import InspectionGrade from './inspectionGrade';
import InspectionInfo from './inspectionInfo';
import RestaurantInfo from './restaurantInfo';
import RestaurantPhoto from './restaurantPhoto';

export default class Restaurant extends Component {
	constructor(props) {
		super(props);

		autoBind(this);
	}

    handleClick(event) {
        event.stopPropagation();
        this.props.onclick(event, this.props.data);
    }

	render() {        
        return (
			<div
				key={this.props.index}
				className="restaurant"
				onClick={(event) => this.handleClick(event)}
			>
				<RestaurantPhoto url={this.props.data.imageUrl} alt={this.props.data.name} />
				<InspectionGrade date={this.props.data.inspections[0].grade_date} grade={this.props.data.inspections[0].grade} seal="grey" />
				<InspectionInfo data={this.props.data.inspections[0]} />
				<RestaurantInfo data={this.props.data} />
			</div>
		);
	}
}
