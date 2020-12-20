import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { HashRouter as Router } from 'react-router-dom';
import { rootReducer } from './store/index';
import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import 'react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css';
import 'rc-tooltip/assets/bootstrap.css';

const store = createStore(rootReducer, applyMiddleware(createLogger()));

ReactDOM.render(
    <React.StrictMode>
        <Router>
            <App store={store} />
        </Router>
    </React.StrictMode>,
    document.getElementById('root'),
);

serviceWorker.unregister();
