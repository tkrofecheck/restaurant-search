import React, { Component } from 'react';
import autoBind from 'react-autobind';
import { Form, FormControl } from 'react-bootstrap';
import Modal from 'react-bootstrap-modal';
import _map from 'lodash/map';
import Grade from './grade';
//import Modal from './modal';
import Restaurant from './restaurant';
import RestaurantMoreInfo from './restaurantInfo';
import blueSeal from '../images/seals/Nyc-seal-blue.png';

const gradeLetters = ['A', 'B', 'C', 'GP'];
const noRestaurants = _map(gradeLetters, function(letter, index) {
	return (
		<div className="gradeLetterContainer" key={index}>
			<Grade
				value={letter}
				seal={blueSeal}
				className="def_gradeLetter"
				showDate="false"
			/>
		</div>
	);
});

export default class Restaurants extends Component {
	constructor(props) {
		super(props);

		this.state = {
			modalClass: 'Restaurant-modal hidden',
			modalContent: <div />,
			restaurants: <div className="Letter-grades">{noRestaurants}</div>,
			showinfo: false
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
					restaurants: restaurants
				});
			}
		}
	}

	showModal(event, content) {
		event.stopPropagation();

		var modalContent;

		if (content !== null) {
			modalContent = (
				<div className="Restaurant-details">
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
		event.stopPropagation();

		this.setState({
			showinfo: false
		});
	}

	render() {
		return (
			<div data-response={this.props.responseData}>
				<Form inline>
					<div className="row Filters">
						<div className="col-lg-12">
							<div className="input-group">
								<div className="input-group-btn">
									<FormControl
										componentClass="select"
										placeholder="all"
										bsStyle="info"
										bsSize="small"
										name="grade"
									>
										<option value="all">Grade</option>
										<option value="a">Grade A</option>
										<option value="b">Grade B</option>
										<option value="c">Grade C</option>
										<option value="gp">
											Grade Pending
										</option>
									</FormControl>
									<FormControl
										componentClass="select"
										placeholder="all"
										bsStyle="info"
										bsSize="small"
										name="price"
									>
										<option value="all">Price</option>
										<option value="1">$</option>
										<option value="2">$$</option>
										<option value="3">$$$</option>
										<option value="4">$$$$</option>
									</FormControl>
								</div>
							</div>
						</div>
					</div>
				</Form>
				<div className="row">{this.state.restaurants}</div>
				{/* <Modal
					content={this.state.modalContent}
					modalClass={this.state.modalClass}
				/> */}
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
