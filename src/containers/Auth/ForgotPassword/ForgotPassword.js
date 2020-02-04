/* eslint-disable react/forbid-prop-types */
/* eslint-disable camelcase */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Input from '../../../components/UI/Input/Input';
import Button from '../../../components/UI/Button/Button';
import classes from './ForgotPassword.module.css';
import checkValidity from '../../../utils/checkValidity';
import * as actions from '../../../store/actions';

export class Login extends Component {
  state = {
    forgotPasswordForm: {
      email: {
        elementType: 'input',
        label: 'E-mail Address',
        elementConfig: {
          type: 'email',
          placeholder: 'name@example.com'
        },
        value: '',
        validation: {
          required: true,
          isEmail: true
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
      const updatedForgotPasswordForm = {
        ...this.state.forgotPasswordForm
      };
      for (const inputIdentifier in updatedForgotPasswordForm) {
        updatedForgotPasswordForm[inputIdentifier].value = '';
        updatedForgotPasswordForm[inputIdentifier].valid = false;
        updatedForgotPasswordForm[inputIdentifier].touched = false;
      }

      this.setState({
        forgotPasswordForm: updatedForgotPasswordForm,
        formIsValid: false
      });
    }
  }

  inputChangeHandler = (event, inputName) => {
    const updatedForgotPasswordForm = {
      ...this.state.forgotPasswordForm,
      [inputName]: {
        ...this.state.forgotPasswordForm[inputName],
        value: event.target.value,
        valid: checkValidity(
          event.target.value,
          this.state.forgotPasswordForm[inputName].validation
        ).isValid,
        touched: true,
        errorMessage: checkValidity(
          event.target.value,
          this.state.forgotPasswordForm[inputName].validation
        ).message
      }
    };

    let formIsValid = true;
    for (const inputIdentifier in updatedForgotPasswordForm) {
      formIsValid =
        updatedForgotPasswordForm[inputIdentifier].valid && formIsValid;
    }
    this.setState({
      forgotPasswordForm: updatedForgotPasswordForm,
      formIsValid
    });
  };

  formSubmitHandler = event => {
    event.preventDefault();

    const formData = {
      email: this.state.forgotPasswordForm.email.value
    };
    const { onRequestResetLink } = this.props;
    onRequestResetLink(formData);
  };

  render() {
    const formElementsArray = [];

    for (const key in this.state.forgotPasswordForm) {
      formElementsArray.push({
        id: key,
        config: this.state.forgotPasswordForm[key]
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
      <div className={classes.ForgotPassword}>
        <div className={classes.Card}>
          <div className={classes.Title}>
            <h1>RESET PASSWORD</h1>
          </div>
          <div className={classes.Form}>
            <form onSubmit={this.formSubmitHandler}>
              {form}
              <Button
                btnType="Primary"
                disabled={!this.state.formIsValid || this.props.loading}
              >
                {this.props.loading ? 'Sending Link...' : 'Send Reset Link'}
              </Button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  onRequestResetLink: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  status: PropTypes.string
};

const mapStateToProps = state => ({
  loading: state.auth.loading,
  status: state.auth.status
});

const mapDispatchToProps = dispatch => ({
  onRequestResetLink: FormData => dispatch(actions.requestResetLink(FormData))
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
