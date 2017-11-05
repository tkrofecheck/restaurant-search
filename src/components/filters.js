import React, { Component } from 'react';
import { Form, FormControl } from 'react-bootstrap';

export default class Filters extends Component {
	render() {
		return (
			<Form inline>
				<div className="row filters">
					<div className="col-lg-12">
						<div className="input-group">
							<div className="input-group-btn">
								<FormControl
									componentClass="select"
									placeholder="all"
									bsStyle="info"
									bsSize="small"
									name="grade"
                                    onSelect={(event) => this.props.events.ongradeselect(event)}
								>
									<option value="all">Grade</option>
									<option value="a">Grade A</option>
									<option value="b">Grade B</option>
									<option value="c">Grade C</option>
									<option value="gp">Grade Pending</option>
								</FormControl>
								<FormControl
									componentClass="select"
									placeholder="all"
									bsStyle="info"
									bsSize="small"
									name="price"
                                    onSelect={(event) => this.props.events.onpriceselect(event)}
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
		);
	}
}
