import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { HashRouter as Router } from 'react-router-dom';
import { rootReducer } from './store/index';
import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import 'bootstrap/dist/css/bootstrap.css'; // or include from a CDN
import 'react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css';

const store = createStore(rootReducer, applyMiddleware(createLogger()));

ReactDOM.render(
    <React.StrictMode>
        <Router>
            <App store={store} />
        </Router>
    </React.StrictMode>,
    document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
