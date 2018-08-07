import React from 'react';

//Components
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import ImageIcon from '@material-ui/icons/Image';
import Divider from '@material-ui/core/Divider';

// API
import api from '../../../../api/index';

const filesApi = api.filesApi;

function ConstructedListItem (props) {
  return (
    <ListItem>
      <Avatar>
        <ImageIcon />
      </Avatar>
      <ListItemText primary={props.fileName} secondary={props.fileHash} />
    </ListItem>
  )
}

class UserUploads extends React.Component  {
  constructor(props) {
    super(props);
    this.state = {
      files: []
    }
  }

  async componentDidMount() {
    const files = await filesApi.getUserFiles();
    this.setState({files});
  }

  render() {
    return (
      <div>
        <List>
          {
            this.state.files.map((file, idx) => {
              return <ConstructedListItem key={idx} fileName={file.fileName} fileHash={file.fileHash}/>
            })
          }
          <li>
            <Divider inset />
          </li>
        </List>
      </div>
    );
  }
}

export default UserUploads;