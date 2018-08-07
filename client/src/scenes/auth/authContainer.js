import { connect } from 'react-redux';
import { createUser, loginLocal } from '../../ducks/auth';
import { bindActionCreators } from 'redux';
import Auth from './auth';

const mapStateToProps = state => ({
  auth: state.auth
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      createUser,
      loginLocal
    },
    dispatch
  );


export default connect(mapStateToProps, mapDispatchToProps)(Auth);