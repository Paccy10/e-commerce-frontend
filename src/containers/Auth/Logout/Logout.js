import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as actions from '../../../store/actions';

export class Logout extends Component {
  componentDidMount() {
    this.props.onLogout();
  }

  render() {
    return <Redirect to="/" />;
  }
}

Logout.propTypes = {
  onLogout: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => ({
  onLogout: () => dispatch(actions.logout())
});

export default connect(null, mapDispatchToProps)(Logout);
