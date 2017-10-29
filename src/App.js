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

class Search extends Component {
	render() {
		return (
			<div className="Restaurant-search">
				<form>
					<div className="title">NYC Restaurants</div>
					<select>
						<option value="all">All</option>
					</select>
					<input type="textbox" id="SearchBox" />
					<input type="button" id="submit" value="Submit" />
				</form>
			</div>
		);
	}
}

class Grades extends Component {
	render() {
		return (
			<div className="Letter-grades">
				<img src={gradeA} alt="Grade A" />
				<img src={gradeB} alt="Grade B" />
				<img src={gradeC} alt="Grade C" />
				<img src={gradeGP} alt="Grade Pending" />
			</div>
		);
	}
}

class App extends Component {
	render() {
		return (
			<div className="App">
				<header className="App-header">
					<ThomasLogo />
				</header>
				<Search />
				<Grades />
				<footer className="App-footer">
					<ThomasLogo />
				</footer>
			</div>
		);
	}
}

export default App;
