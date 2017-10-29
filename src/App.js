import React, { Component } from 'react';
import logo from './thomas_logo.png';
import gradeA from './a.png';
import gradeB from './b.png';
import gradeC from './c.png';
import gradeGP from './GP.png';
import './App.css';

class ThomasLogo extends Component {
class Grade extends Component {
	render() {
		var element;

		switch (this.props.value) {
			case 'A':
				element = <Image src={gradeA} alt="Grade A" />;
				break;

			case 'B':
				element = <Image src={gradeB} alt="Grade B" />;
				break;

			case 'C':
				element = <Image src={gradeC} alt="Grade C" />;
				break;

			default:
				element = <Image src={gradeGP} alt="Grade Pending" />;
				break;
		}

		return element;
	}
}
	}
}

class SearchForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			searchFilter: 'all',
			searchPage: '1',
			searchQuery: '',
			searchResults: (
				<div className="Letter-grades">
					<Grade value="A" />
					<Grade value="B" />
					<Grade value="C" />
					<Grade value="D" />
				</div>
			)
		};

		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleInputChange(event) {
		var target = event.target;
		var value = target.value;
		var name = target.name;

		this.setState({
			[name]: value
		});
	}

	handleSubmit(event) {
		event.preventDefault(); // prevent default form submit
		console.log('form data', this.state.value);
	}

	render() {
		return (
			<div className="Restaurant-search">
				<form>
					<div className="title">NYC Restaurants</div>
					<select
						name="searchFilter"
						value={this.state.searchFilter}
						onChange={this.handleInputChange}
					>
						<option value="all">All</option>
						<option value="a">Grade A</option>
						<option value="b">Grade B</option>
						<option value="c">Grade C</option>
						<option value="gp">Grade Pending</option>
					</select>
					<input
						name="searchQuery"
						type="textbox"
						value={this.state.searchQuery}
						onChange={this.handleInputChange}
					/>
					<input
						type="submit"
						value="Submit"
						onClick={this.handleSubmit}
					/>
				</form>
				<div className="Search-results">{this.state.searchResults}</div>
			</div>
		);
	}
}

class Image extends Component {
	render() {
		return (
			<img
				src={this.props.src}
				className={this.props.className}
				alt={this.props.alt}
			/>
		);
	}
}

class App extends Component {
	render() {
		return (
			<div className="App">
				<header className="App-header">
					<Image src={logo} alt="Thomas Logo" />
				</header>
				<SearchForm />
				<footer className="App-footer">
					<Image src={logo} alt="Thomas Logo" />
				</footer>
			</div>
		);
	}
}

export default App;
