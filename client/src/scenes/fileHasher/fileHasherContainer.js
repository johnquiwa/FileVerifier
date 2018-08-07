import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import FileHasher from './fileHasher'
const mapStateToProps = state => ({
  auth: state.auth
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({},
    dispatch
  );


export default connect(mapStateToProps, mapDispatchToProps)(FileHasher);