import React from 'react';
import { Link } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import formFields from '../../components/form/fields';
import asyncValidate from '../../components/form/asyncValidate';
import validate from '../../components/form/validate';
import Button from '@material-ui/core/Button';
import styles from './auth.module.css';

const SignUpForm = props => {
  console.log(props);
  const { handleSubmit, createUser} = props;
  return (
    <form name="email-form" data-name="Email Form" className="form" onSubmit={ handleSubmit(createUser) }>
      <Field name="email" component={formFields.renderEmailField} label="Email" />
      <Field name="password" component={formFields.renderPasswordField} label="Password" />
      <div className={styles['button-container']}>
        <Button type="submit" className={styles['button-left']}><Link to="login" className="link">I already have an account</Link></Button>
        <Button type="submit" variant="contained" color="primary" className={styles['button-right']}>Signup</Button>
      </div>
    </form>
  );
};

export default reduxForm({
  form: 'SignUpForm',
  validate,
  asyncValidate,
})(SignUpForm);
