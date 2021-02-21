import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

// import App from './store/routes/App';
import initialState from './store/initialState';
import reducer from './store/reducers';

import App from './counter/App';

import './index.css';

const store = createStore(reducer, initialState);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app'),
);
