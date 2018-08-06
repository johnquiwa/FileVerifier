import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import store, { history } from './store';
import './index.css';
import App from './App';

render(
  <Provider store={store}>
    <Router history={history}>
      <div>
        <App/>
      </div>
    </Router>
  </Provider>,
  document.getElementById('root')
);
