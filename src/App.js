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

const apiKey = 'GC25gGvU068FNzk16wkfN8vK6JmzsKfk6BsYzhpb';

class App extends Component {
	render() {
		return (
			<div className="App">
				<AppHeader />
				<SearchForm apiKey={apiKey} />
				<AppFooter />
			</div>
		);
	}
}

export default App;
