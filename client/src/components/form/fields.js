import React from 'react';
import styles from './fields.module.css'
import TextField from '@material-ui/core/TextField';

const renderEmailField = ({input}) => (
  <div className={styles['text-field-container']}>
    <TextField
      label="Email"
      className={styles['text-field']}
      margin="normal"
      name="email"
      {...input}
    />
  </div>
);

const renderPasswordField = ({input}) => (
  <div className={styles['text-field-container']}>
    <TextField
      type="password"
      label="Password"
      className={styles['text-field']}
      margin="normal"
      {...input}
    />
  </div>
);

export default {
  renderEmailField,
  renderPasswordField,
};