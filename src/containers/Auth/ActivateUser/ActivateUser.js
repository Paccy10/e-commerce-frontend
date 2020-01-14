/* eslint-disable camelcase */
/* eslint-disable react/forbid-prop-types */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Button from '../../../components/UI/Button/Button';
import classes from './ActivateUser.module.css';
import * as actions from '../../../store/actions';

export class ActivateUser extends Component {
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.status === 'success') {
      this.props.history.push('/login');
    }
  }

  activateUserHandler = () => {
    const { token } = this.props.match.params;
    const { onActivateUser } = this.props;
    onActivateUser(token);
  };

  render() {
    return (
      <div className={classes.ActivateUser}>
        <div className={classes.Card}>
          <div className={classes.Title}>
            <h1>ACTIVATE USER ACCOUNT</h1>
          </div>
          <div className={classes.Content}>
            <p>
              We’re excited you decided to join us. we’re here to help you make
              your online shopping very exciting. Please click the link below to
              activate your account
            </p>
            <Button btnType="Primary" onClick={this.activateUserHandler}>
              Activate Account
            </Button>
            <p>Thank you for choosing Arrows Shop!</p>
          </div>
        </div>
      </div>
    );
  }
}

ActivateUser.propTypes = {
  onActivateUser: PropTypes.func.isRequired,
  match: PropTypes.object,
  status: PropTypes.string,
  history: PropTypes.object
};

const mapSateToProps = state => ({
  loading: state.auth.loading,
  status: state.auth.status
});

const mapDispatchToProps = dispatch => ({
  onActivateUser: token => dispatch(actions.activate(token))
});

export default connect(mapSateToProps, mapDispatchToProps)(ActivateUser);
