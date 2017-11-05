import React, { Component } from 'react';
import autoBind from 'react-autobind';
import { Button, Form, FormControl } from 'react-bootstrap';

export default class SearchBox extends Component {
	constructor(props) {
		super(props);

		this.state = {
			searchType: 'search',
			searchQuery: ''
		};

		autoBind(this);
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.searchType !== this.state.searchType) {
			this.setState({
				searchType: nextProps.searchType
			});
		}

		if (nextProps.searchQuery !== this.state.searchQuery) {
			this.setState({
				searchQuery: nextProps.searchQuery
			});
		}
	}

	render() {
		return (
			<div className="restaurant-search">
				<Form inline>
					<div className="input-group">
						<div className="input-group-btn">
							<FormControl
								componentClass="select"
								placeholder="all"
								bsStyle="default"
								bsSize="large"
								id="searchFilter"
								onSelect={event =>
									this.props.events.onselect(event)}
							>
								<option value="all">All</option>
							</FormControl>
							<FormControl
								type="text"
								bsSize="large"
								id="searchQuery"
								value={this.state.searchQuery}
								onChange={event =>
									this.props.events.oninputchange(event)}
								onKeyPress={event =>
									this.props.events.onkeypress(event)}
							/>
						</div>
					</div>
					<Button
						bsStyle="success"
						bsSize="large"
						onClick={event => this.props.events.onsubmit(event)}
					>
						Search
					</Button>
				</Form>
			</div>
		);
	}
}
