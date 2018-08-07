import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import styles from './filesHasher.module.css';
import UserUploads from './scenes/userUploads/userUploads';
import VerifyFileForm from './scenes/verifyFile/verifyFile';
import NewUpload from './scenes/newUpload/newUpload';

function TabContainer(props) {
  return (
    <Typography component="div" class={styles['tab-view']}>
      {props.children}
    </Typography>
  );
}


class FileHasher extends React.Component  {
  constructor(props) {
    super(props);
    this.state = {
      value: 0
    }
  }

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    console.log(this.state);
    const { value } = this.state;
    return (
      <div>
        <AppBar position="static" color="default">
          <Tabs
            value={this.state.value}
            onChange={this.handleChange}
            indicatorColor="primary"
            textColor="primary"
            centered
          >
            <Tab label="Verify File" />
            <Tab label="My Uploads" />
            <Tab label="New Upload" />
          </Tabs>
        </AppBar>
        {value === 0 && <TabContainer><VerifyFileForm /></TabContainer>}
        {value === 1 && <TabContainer><UserUploads /></TabContainer>}
        {value === 2 && <TabContainer><NewUpload /></TabContainer>}
      </div>
    );
  }
};

export default FileHasher;