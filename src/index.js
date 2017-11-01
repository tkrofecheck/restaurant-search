import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

if (
    typeof window.orientation !== 'undefined' ||
    navigator.userAgent.match(
        /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile/i
    )
) {
    document.getElementsByTagName('body')[0].classList.add('mobile');
}

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
