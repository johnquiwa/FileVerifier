import React, { Component } from 'react';
import AuthForm from './authForm';

class Auth extends Component {
  constructor(props) {
    super(props);
  }

  renderForms() {
    return (
      <div>
          <AuthForm {...this.props}/>
      </div>
    );
  }

  render() {
    return (
      this.renderForms()
    );
  }
}

export default Auth;