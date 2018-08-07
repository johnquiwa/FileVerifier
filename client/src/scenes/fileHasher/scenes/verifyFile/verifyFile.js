import React from 'react';
import CaptureFileInput from '../components/CaptureFileInput.js';
import UploadButton from '../components/UploadButton.js'
import styles from '../components/components.module.css';
import verifyStyles from './verifyFile.module.css';
import 'typeface-roboto';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import { captureFile, convertBufferToHash } from '../../../utils';
import api from '../../../api';

const filesApi = api.filesApi;

class VerifyFileForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      fileName: '...',
      fileHash: '',
      showResult: false,
      email: '',
      result: null
    }
  }

  async handleSubmitVerify() {
    const verification = await filesApi.verifyFile(this.state.fileHash, this.state.email);
    const result = verification.status === 200;
    this.setState({
      fileName: '',
      fileHash: '',
      showResult: true,
      result
    });
  }

  handleEmailChange = (event) => {
    this.setState({
      [event.target.name] : event.target.value
    })
  };

  renderUploadFields = () => {
    const convertToBuffer = async(reader, file) => {
      const buffer = await Buffer.from(reader.result);
      const fileHash = convertBufferToHash(buffer);
      console.log(fileHash);
      console.log(file.name);
      this.setState({buffer, fileHash, fileName: file.name});
      console.log(this.state);
    };

    return (
        <div className={styles['upload-container']}>
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
          <div>
            <TextField
              label="Email"
              style={{width: '100%'}}
              margin="normal"
              name="email"
              onChange={this.handleEmailChange}
            />
          </div>
          <div className={styles['verify-button-container']}>
            <Button color="primary" variant="outlined" component="span" onClick={this.handleSubmitVerify.bind(this)}>
              VERIFY
            </Button>
          </div>
        </div>
    )
  };

  renderTrue() {
    return (
      <div className={verifyStyles['result-container']}>
        <div className={verifyStyles.result}>
          <img className={verifyStyles.image} src="http://weknowmemes.com/generator/uploads/generated/g1407258701379773855.jpg" />
          <p className={verifyStyles['text-true']}>Verified: File was uploaded by {this.state.email}</p>
        </div>
        <Button color="primary" variant="outlined" component="span" onClick={() => this.setState({showResult: false})}>
          VERIFY ANOTHER
        </Button>
      </div>
    );
  }

  renderFalse() {
    return (
      <div className={verifyStyles['result-container']}>
        <div className={verifyStyles.result}>
          <img className={verifyStyles.image} src="https://memegenerator.net/img/instances/66040229/false.jpg" />
          <p className={verifyStyles['text-false']}>File was NOT uploaded by {this.state.email}</p>
        </div>
        <Button color="primary" variant="outlined" component="span" onClick={() => this.setState({showResult: false})}>
          VERIFY ANOTHER
        </Button>
      </div>
    );
  }

  renderResponse(result) {
    console.log(result);
    return result ?
      this.renderTrue() :
      this.renderFalse()
  }

  render () {
    console.log(this.state);
    return (
      <div>
        { this.state.showResult ?
          this.renderResponse(this.state.result) :
          this.renderUploadFields()
        }
      </div>
    )
  }
}

export default VerifyFileForm;
