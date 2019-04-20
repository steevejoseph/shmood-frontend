import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import ReduxThunk from 'redux-thunk';

import {} from 'dotenv/config';

import reducers from './reducers';

import 'bootstrap/dist/css/bootstrap.min.css';

import App from './components/App';

// https://github.com/zalmoxisus/redux-devtools-extension#usage
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const c = composeEnhancers(applyMiddleware(ReduxThunk));
const store = createStore(reducers, {}, c);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
