import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Redirect, Link, Route } from 'react-router-dom';
import {LoginAction, LogoutAction} from '../actions/LoginAction';
import Documents from '../containers/GetDocument';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import GetUsers from '../containers/GetUsers';
import GetDocument from '../containers/GetDocument';

class Dashboard extends Component {

  render() {
    if (!this.props.status.valid) {
      return (<Redirect
        push
        to={{
          pathname: '/login',
        }}
      />);
    }
    
    return (
      <div className="">
        <Navbar />
        <div className="col s3">
          <Sidebar {...this.props} />
        </div>
      </div>
    );
  }
}


const mapDispatchToProps =
  dispatch => bindActionCreators({ LoginAction, LogoutAction }, dispatch);

const mapStateToProps = state => ({
  status: state.login
});
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);

