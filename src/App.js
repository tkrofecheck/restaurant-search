import React, { Component } from 'react';
import AppHeader from './components/appHeader';
import AppFooter from './components/appFooter';
import SearchForm from './components/searchForm';


/*
// Needed for Redux - try to implement later
import { connect, Provider } from 'react-redux';
import { createStore } from 'redux';
*/

import './stylesheets/App.css';

class App extends Component {
	render() {
		return (
			<div className="App">
				<AppHeader />
				<SearchForm />
				<AppFooter />
			</div>
		);
	}
}

export default App;
