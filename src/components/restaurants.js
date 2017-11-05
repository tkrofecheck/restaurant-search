import React, { Component } from 'react';
import autoBind from 'react-autobind';
import Modal from 'react-bootstrap-modal';
import _map from 'lodash/map';
import Filters from './filters';
import Grade from './grade';
import InspectionSeal from './inspectionSeal';
import Restaurant from './restaurant';
import RestaurantMoreInfo from './restaurantInfo';

const noRestaurants = _map(['A', 'B', 'C', 'GP'], function(letter, index) {
	return (
		<div className="grade-letter-container" key={index}>
			<InspectionSeal seal="grey" />
			<Grade value={letter} />
		</div>
	);
});

export default class Restaurants extends Component {
	constructor(props) {
		super(props);

		this.state = {
			modalClass: 'restaurant-modal hidden',
			modalContent: <div />,
			restaurants: noRestaurants,
			responseData: false,
			showinfo: false,
			tiles: 'letter-grid'
		};

		autoBind(this);
	}

	componentWillReceiveProps(nextProps) {
		var _this = this;
		var restaurants;

		if (
			typeof nextProps.data !== 'undefined' &&
			nextProps.data.length > 0
		) {
			restaurants = _map(this.props.data, function(restaurant, index) {
				return (
					<Restaurant
						key={index}
						data={restaurant}
						index={index}
						onclick={event => _this.showModal(event, restaurant)}
					/>
				);
			});

			if (this.state.restaurants !== restaurants) {
				this.setState({
					restaurants: restaurants,
					responseData: true,
					tiles: 'restaurant-grid'
				});
			}
		}
	}

	showModal(event, content) {
		var modalContent;

		if (content !== null) {
			modalContent = (
				<div className="restaurant">
					<RestaurantMoreInfo data={content} />
				</div>
			);

			this.setState({
				modalContent: modalContent,
				showinfo: true
			});
		}
	}

	closeModal(event) {
		this.setState({
			showinfo: false
		});
	}

	onGradeChange(event) {
		event.preventDefault();
	}

	onPriceChange(event) {
		event.preventDefault();
	}

	render() {
		let filterEvents = {
			ongradeselect: (event) => this.onGradeChange(event),
			onpriceselect: (event) => this.onPriceChange(event)
		};
		
		return (
			<div data-response={this.state.responseData}>
				<Filters events={filterEvents} />
				<div className={this.state.tiles}>{this.state.restaurants}</div>
				<Modal
					show={this.state.showinfo}
					onHide={event => this.closeModal(event)}
					aria-labelledby="ModalHeader"
				>
					{/* <Modal.Header closeButton>
						<Modal.Title id="ModalHeader">
							A Title Goes here
						</Modal.Title>
					</Modal.Header> */}
					<Modal.Body>
						<div
							className="close"
							onClick={event => this.closeModal(event)}
						>
							Close
						</div>
						{this.state.modalContent}
					</Modal.Body>
					{/* <Modal.Footer>
						<Modal.Dismiss className="btn btn-default">
							Cancel
						</Modal.Dismiss>
					</Modal.Footer> */}
				</Modal>
			</div>
		);
	}
}
