import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import './index.css';
import App, { store } from './App';
import * as serviceWorker from './serviceWorker';

/* FINAL RENDER - here, we have wrapped our root component with <Provider>  */
ReactDOM.render(
  <Provider store={store}><App /></Provider>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
