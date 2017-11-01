import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

var body = document.getElementsByTagName('body')[0];

if (
	typeof window.orientation !== 'undefined' ||
	navigator.userAgent.match(
		/Android|BlackBerry|iPhone|iPod|Opera Mini|IEMobile/i
	)
) {
	body.classList.add('mobile');
} else {
	body.classList.add('start');
}

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
