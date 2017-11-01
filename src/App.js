import React, { Component } from 'react';
import Image from './components/image';
import SearchForm from './components/searchForm';
import SearchBox from './components/searchBox';

/*
// Needed for Redux - try to implement later
import { connect, Provider } from 'react-redux';
import { createStore } from 'redux';
*/

import logo from './images/logos/thomas_logo.png';
import './stylesheets/App.css';

const apiKey = 'GC25gGvU068FNzk16wkfN8vK6JmzsKfk6BsYzhpb';

class App extends Component {
	render() {
		return (
			<div className="App">
				<header className="App-header">
					<Image src={logo} alt="Thomas Logo" />
					<SearchBox />
				</header>
				<SearchForm apiKey={apiKey} />
				<footer className="App-footer">
					<Image src={logo} alt="Thomas Logo" />
				</footer>
			</div>
		);
	}
}

export default App;
