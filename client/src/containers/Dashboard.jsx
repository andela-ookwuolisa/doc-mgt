import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { LoginAction, LogoutAction } from '../actions/AuthAction';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';


/**
 *
 *Dashboard renders the sidebar, navbar and footer
 * @param {any} props
 * @returns {html} DOM element
 */
export const Dashboard = props => (
  <div className="dashboard">
    <Navbar />
    <div className="col s3">
      <Sidebar {...props} />
    </div>
    <Footer />
  </div>
  );
Dashboard.getDefaultProps = {
  status: {},
  valid: false
};
Dashboard.propTypes = {
  status: PropTypes.shape({
    valid: PropTypes.bool
  }),
};

const mapDispatchToProps =
  dispatch => bindActionCreators({ LoginAction, LogoutAction }, dispatch);

const mapStateToProps = state => ({
  status: state.auth
});
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);

