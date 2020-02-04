/* eslint-disable react/forbid-prop-types */
/* eslint-disable camelcase */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Input from '../../../../components/UI/Input/Input';
import Button from '../../../../components/UI/Button/Button';
import classes from './ResetPassword.module.css';
import checkValidity from '../../../../utils/checkValidity';
import * as actions from '../../../../store/actions';

export class Login extends Component {
  state = {
    resetPasswordForm: {
      password: {
        elementType: 'input',
        label: 'Password',
        elementConfig: {
          type: 'password'
        },
        value: '',
        validation: {
          required: true,
          minLength: 8
        },
        valid: false,
        touched: false,
        errorMessage: ''
      },
      confirmPassword: {
        elementType: 'input',
        label: 'Confirm Password',
        elementConfig: {
          type: 'password'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        errorMessage: ''
      }
    },
    formIsValid: false
  };

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.status === 'success') {
      this.props.history.push('/login');
    }
  }

  inputChangeHandler = (event, inputName) => {
    const updatedResetPasswordForm = {
      ...this.state.resetPasswordForm,
      [inputName]: {
        ...this.state.resetPasswordForm[inputName],
        value: event.target.value,
        valid: checkValidity(
          event.target.value,
          this.state.resetPasswordForm[inputName].validation
        ).isValid,
        touched: true,
        errorMessage: checkValidity(
          event.target.value,
          this.state.resetPasswordForm[inputName].validation
        ).message
      }
    };

    let formIsValid = true;
    for (const inputIdentifier in updatedResetPasswordForm) {
      formIsValid =
        updatedResetPasswordForm[inputIdentifier].valid && formIsValid;
    }
    this.setState({
      resetPasswordForm: updatedResetPasswordForm,
      formIsValid
    });
  };

  formSubmitHandler = event => {
    event.preventDefault();

    const formData = {
      password: this.state.resetPasswordForm.password.value
    };
    const { onResetPassword, match, onSetAlert } = this.props;
    if (
      this.state.resetPasswordForm.password.value !==
      this.state.resetPasswordForm.confirmPassword.value
    ) {
      onSetAlert('Passwords do not match', 'Danger');
    } else {
      onResetPassword(match.params.token, formData);
    }
  };

  render() {
    const formElementsArray = [];

    for (const key in this.state.resetPasswordForm) {
      formElementsArray.push({
        id: key,
        config: this.state.resetPasswordForm[key]
      });
    }

    const form = formElementsArray.map(formElement => (
      <Input
        key={formElement.id}
        label={formElement.config.label}
        elementType={formElement.config.elementType}
        elementConfig={formElement.config.elementConfig}
        value={formElement.config.value}
        onChange={event => this.inputChangeHandler(event, formElement.id)}
        invalid={!formElement.config.valid}
        shouldValidate={formElement.config.validation}
        touched={formElement.config.touched}
        errorMessage={formElement.config.errorMessage}
      />
    ));

    return (
      <div className={classes.ResetPassword}>
        <div className={classes.Card}>
          <div className={classes.Title}>
            <h1>CREATE NEW PASSWORD</h1>
          </div>
          <div className={classes.Form}>
            <form onSubmit={this.formSubmitHandler}>
              {form}
              <Button
                btnType="Primary"
                disabled={!this.state.formIsValid || this.props.loading}
              >
                {this.props.loading ? 'Saving Changes...' : 'Update Password'}
              </Button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  onResetPassword: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  status: PropTypes.string,
  history: PropTypes.object,
  match: PropTypes.object,
  onSetAlert: PropTypes.func
};

const mapStateToProps = state => ({
  loading: state.auth.loading,
  status: state.auth.status
});

const mapDispatchToProps = dispatch => ({
  onResetPassword: (token, FormData) =>
    dispatch(actions.resetPassword(token, FormData)),
  onSetAlert: (message, alertType) =>
    dispatch(actions.setAlert(message, alertType))
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
