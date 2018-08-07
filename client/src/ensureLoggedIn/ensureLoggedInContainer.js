import React from 'react';  
import { bindActionCreators } from 'redux';
import {connect} from 'react-redux';
import { getSession } from './../ducks/auth';
import { push } from 'react-router-redux';

export function ensureLoggedIn(Component) {

  class AuthenticatedComponent extends React.Component {
    componentWillMount() {
      this.checkAuth();
    }

    componentWillReceiveProps(nextProps) {
      this.checkAuth();
    }

    checkAuth() {
      if (!this.props.isLoggedIn) {
        return this.props.getSession()
          .then((session) => {
            if(!session) {
              push('/login');
            }
          });
      }
    }

    render() {
      return (
        <div>
          {this.props.isLoggedIn === true
            ? <Component {...this.props}/>
            : null
          }
        </div>
      );

    }
  }

  const mapStateToProps = (state) => ({
    isLoggedIn: state.auth.isLoggedIn
  });

  const mapDispatchToProps = dispatch =>
    bindActionCreators(
      {
        getSession
      },
      dispatch
    );

  return connect(mapStateToProps, mapDispatchToProps)(AuthenticatedComponent);
}