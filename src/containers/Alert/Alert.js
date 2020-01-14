/* eslint-disable react/forbid-prop-types */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import classes from './Alert.module.css';
import * as actions from '../../store/actions';

export class Alert extends Component {
  onClose = () => {
    const { onRemoveAlert } = this.props;
    onRemoveAlert();
  };

  render() {
    const { alert } = this.props;
    let modalClasses = [classes.Content];
    if (alert.alertType === 'Success') {
      modalClasses = [classes.Content, classes.Success];
    }

    if (alert.alertType === 'Danger') {
      modalClasses = [classes.Content, classes.Danger];
    }

    if (alert.alertType === 'Warning') {
      modalClasses = [classes.Content, classes.Warning];
    }
    return (
      alert.message !== null &&
      alert.alertType !== null && (
        <div id="alert-modal" className={classes.Alert}>
          <div className={modalClasses.join(' ')}>
            <div className={classes.Close} onClick={this.onClose}>
              &times;
            </div>
            <div className={classes.Message}>
              {alert.alertType === 'Success' ? (
                <strong>Success: </strong>
              ) : (
                <strong>Error: </strong>
              )}
              {alert.message}
            </div>
          </div>
        </div>
      )
    );
  }
}

Alert.propTypes = {
  alert: PropTypes.object,
  onRemoveAlert: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  alert: state.alert
});

const mapDispatchToProps = dispatch => ({
  onRemoveAlert: () => dispatch(actions.removeAlert())
});

export default connect(mapStateToProps, mapDispatchToProps)(Alert);
