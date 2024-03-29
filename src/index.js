import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

//import { createStore } from 'redux';
// import App from './store/routes/App';
// import initialState from './store/initialState';
// import reducer from './store/reducers';

// const store = createStore(reducer, initialState);

import store from './jotto/redux/configureStore';
// import App from './counter/App';
// import App from './jotto/Class/App';
// import App from './jotto/Function/App';
import App from './jotto/Context/App';

import './index.css';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app'),
);
