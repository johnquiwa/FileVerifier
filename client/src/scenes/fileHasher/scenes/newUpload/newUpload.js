import React from 'react';
import CaptureFileInput from '../components/CaptureFileInput.js';
import UploadButton from '../components/UploadButton.js'
import styles from '../components/components.module.css';
import newUploadStyles from './newUpload.module.css';
import 'typeface-roboto';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import {captureFile, convertBufferToHash} from '../../../utils';
import api from '../../../api';

const filesApi = api.filesApi;

class NewFile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      fileName: '...',
      fileHash: '',
      showStatus: false
    }
  }

  async handleSubmitUpload() {
    try {
      await filesApi.createLink(this.state.fileHash, this.state.fileName);
      this.setState({
        showStatus: true,
        fileName: '...',
        fileHash: ''
      });
    } catch(err) {
      throw new Error('Unable to upload')
    }
  }

  renderUploadFields = () => {
    const convertToBuffer = async(reader, file) => {
      const buffer = await Buffer.from(reader.result);
      const fileHash = convertBufferToHash(buffer);
      this.setState({buffer, fileHash, fileName: file.name});
    };

    return (
      <div>
        <div className={styles['upload-container__file']}>
          <div>
            Filename:
            <p style={{fontFamily: 'typeface-roboto'}}>
              {this.state.fileName}
            </p>
          </div>
          <CaptureFileInput captureFile={captureFile.bind(this, convertToBuffer)}/>
          <UploadButton/>
        </div>
        <Divider className={styles.divider} />
        <div className={styles['verify-button-container']}>
          <Button color="primary" variant="outlined" component="span" onClick={this.handleSubmitUpload.bind(this)}>
            LINK
          </Button>
        </div>
      </div>
    )
  };

  renderConfirmedUpload = () => {
    return (
      <div>
        <p className={newUploadStyles['text-true']}>File has been successfully uploaded</p>
        <Button color="primary" variant="outlined" component="span" onClick={() => this.setState({showStatus: false})}>
          UPLOAD ANOTHER
        </Button>
      </div>
    );
  };

  render() {
    return (
      <div className={styles['upload-container']}>
        {
          this.state.showStatus ?
          this.renderConfirmedUpload() :
          this.renderUploadFields()
        }
      </div>
    )
  }
}

export default NewFile;
