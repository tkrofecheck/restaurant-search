import React, { Component } from 'react';
import autoBind from 'react-autobind';
import { Form, FormControl } from 'react-bootstrap';
import _map from 'lodash/map';
import Grade from './grade';
import Modal from './modal';
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
			modalContent: <div />
		};

		autoBind(this);
	}

	showModal(event, content, display) {
		event.stopPropagation();

		var modalClass = 'Restaurant-modal show';
		var modalContent = <div></div>;
		
		if (content !== null) {
			modalContent =
				<div className="Restaurant-details">
					<div
						className="close"
						onClick={event =>
							this.showModal(event, null, false)}
					>
						Close
					</div>
					<RestaurantMoreInfo data={content} />
				</div>;
		}

		this.setState({
			modalContent: modalContent
		});
		
		if (display) {
            setTimeout(
                function() {
                    modalClass = 'Restaurant-modal show visible';
                    this.setState({ modalClass: modalClass });
                }.bind(this)
            , 10);
		} else {
            setTimeout(
                function() {
                    modalClass = 'Restaurant-modal';
                    this.setState({ modalClass: modalClass });
                }.bind(this)
            , 510); // Keep timeout slightly higher than transition time of 500ms
		};
	}

	render() {
		var _this = this;
		var restaurants = <div className="Letter-grades">{noRestaurants}</div>;

		console.log('this.props.data', this.props.data);
		if (typeof this.props.data !== 'undefined' && this.props.data.length > 0) {
			restaurants = _map(this.props.data, function(restaurant, index) {
				return <Restaurant data={restaurant} index={index} onclick={(event) => _this.showModal(event, restaurant)}/>;
			});
		}

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
				<div className="row">{restaurants}</div>
				<Modal
					content={this.state.modalContent}
					modalClass={this.state.modalClass}
				/>
			</div>
		);
	}
}
