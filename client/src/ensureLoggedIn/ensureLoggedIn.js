import React from 'react';
import {
  Route,
} from 'react-router-dom';

const EnsureLoggedIn = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    <Component {...props} />
  )} />
);

export default EnsureLoggedIn;