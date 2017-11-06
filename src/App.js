import React, { Component } from 'react';
import AppHeader from './base/appHeader';
import AppFooter from './base/appFooter';
import AppBody from './base/appBody';


/*
// Needed for Redux - try to implement later
import { connect, Provider } from 'react-redux';
import { createStore } from 'redux';
*/

import './stylesheets/App.css';

class App extends Component {
	render() {
		return (
			<div className="app">
				<AppHeader />
				<AppBody />
				<AppFooter />
			</div>
		);
	}
}

export default App;
