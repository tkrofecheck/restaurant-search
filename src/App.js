import React, { Component } from 'react';
import logo from './thomas_logo.png';
import gradeA from './a.png';
import gradeB from './b.png';
import gradeC from './c.png';
import gradeGP from './GP.png';
import './App.css';

class ThomasLogo extends Component {
	render() {
		return <img src={logo} className="Thomas-logo" alt="logo" />;
	}
}

class SearchForm extends Component {
	constructor(props) {
		super(props);
		this.state = { value: '' };

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(event) {
		this.setState({ value: event.target.value });
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
					<select>
						<option value="all">All</option>
					</select>
					<input
						type="textbox"
						value={this.state.value}
						onChange={this.handleChange}
					/>
					<input
						type="submit"
						value="Submit"
						onClick={this.handleSubmit}
					/>
				</form>
				<div className="Letter-grades">
					<Image src={gradeA} alt="Grade A" />
					<Image src={gradeB} alt="Grade B" />
					<Image src={gradeC} alt="Grade C" />
					<Image src={gradeGP} alt="Grade Pending" />
				</div>
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
