import React from 'react';
import { Link } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import formFields from '../../components/form/fields';
import asyncValidate from '../../components/form/asyncValidate';
import validate from '../../components/form/validate';
import Button from '@material-ui/core/Button';
import styles from './auth.module.css';

const LoginForm = props => {
  const { handleSubmit, loginLocal } = props;
  return (
    <form id="email-form" name="email-form" data-name="Email Form" onSubmit={ handleSubmit(loginLocal) }>
      <Field name="email" component={ formFields.renderEmailField } label="Email" />
      <Field name="password" component={ formFields.renderPasswordField } label="Password" />
      <div className={styles['button-container']}>
        <Button type="submit" className={styles['button-left']}><Link to="signup" className="link">I need to create an account</Link></Button>
        <Button type="submit" variant="contained" color="primary" className={styles['button-right']}>Login</Button>
      </div>
    </form>
  );
};

export default reduxForm({
  form: 'LoginForm',
  validate,
  asyncValidate,
})(LoginForm);
