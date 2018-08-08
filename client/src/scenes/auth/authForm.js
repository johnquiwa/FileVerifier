import React from 'react';
import LoginForm from './loginForm';
import SignupForm from './signupForm';
import styles from './auth.module.css'


const AuthForm = (props) => {
  return (
    <div className={styles.card}>
      {props.match.path === '/signup' ? (
        <SignupForm {...props}/>
      ) : (
        <LoginForm {...props}/>
      )}
    </div>
  );
};

export default AuthForm;