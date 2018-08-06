import { connect } from 'react-redux';
import { createUser, loginLocal } from './../ducks/auth';
import { ensureLoggedIn } from '../ensureLoggedIn/ensureLoggedInContainer';
import { bindActionCreators } from 'redux';
import FileHasher from './fileHasher'
const mapStateToProps = state => ({
  auth: state.auth
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({},
    dispatch
  );


export default ensureLoggedIn(connect(mapStateToProps, mapDispatchToProps)(FileHasher));