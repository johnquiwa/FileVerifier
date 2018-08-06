import { connect } from 'react-redux';
import { createUser, loginLocal } from '../../ducks/auth';
import { bindActionCreators } from 'redux';
import { ensureLoggedIn } from '../../ensureLoggedIn/ensureLoggedInContainer';
import NavBar from './nav';

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


//export default ensureLoggedIn(connect(mapStateToProps, mapDispatchToProps)(NavBar));
export default connect(mapStateToProps, mapDispatchToProps)(NavBar);