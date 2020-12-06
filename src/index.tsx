import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom';
import { rootReducer } from './store/index';
import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';

const store = createStore(rootReducer, applyMiddleware(createLogger()));

ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <App store={store} />
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
