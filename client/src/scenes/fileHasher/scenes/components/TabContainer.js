import React from 'react';
import Typography from '@material-ui/core/Typography';
import styles from './components.module.css';

const TabContainer = (props) => {
  return (
    <Typography component="div" class={styles['tab-view']}>
      {props.children}
    </Typography>
  );
};

export default TabContainer;