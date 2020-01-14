/* eslint-disable camelcase */
/* eslint-disable react/forbid-prop-types */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Input from '../../../components/UI/Input/Input';
import Button from '../../../components/UI/Button/Button';
import classes from './Signup.module.css';
import checkValidity from '../../../utils/checkValidity';
import * as actions from '../../../store/actions';

export class Signup extends Component {
  state = {
    signupForm: {
      firstname: {
        elementType: 'input',
        label: 'Firstname',
        elementConfig: {
          type: 'text'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        errorMessage: ''
      },
      lastname: {
        elementType: 'input',
        label: 'Lastname',
        elementConfig: {
          type: 'text'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        errorMessage: ''
      },
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
      },
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

  UNSAFE_componentWillReceiveProps(nextprops) {
    if (nextprops.status === 'success') {
      const updatedSignupForm = {
        ...this.state.signupForm
      };
      for (const inputIdentifier in updatedSignupForm) {
        updatedSignupForm[inputIdentifier].value = '';
        updatedSignupForm[inputIdentifier].valid = false;
        updatedSignupForm[inputIdentifier].touched = false;
      }

      this.setState({ signupForm: updatedSignupForm, formIsValid: false });
    }
  }

  inputChangeHandler = (event, inputName) => {
    const updatedSignupForm = {
      ...this.state.signupForm,
      [inputName]: {
        ...this.state.signupForm[inputName],
        value: event.target.value,
        valid: checkValidity(
          event.target.value,
          this.state.signupForm[inputName].validation
        ).isValid,
        touched: true,
        errorMessage: checkValidity(
          event.target.value,
          this.state.signupForm[inputName].validation
        ).message
      }
    };

    let formIsValid = true;
    for (const inputIdentifier in updatedSignupForm) {
      formIsValid = updatedSignupForm[inputIdentifier].valid && formIsValid;
    }
    this.setState({ signupForm: updatedSignupForm, formIsValid });
  };

  formSubmitHandler = event => {
    event.preventDefault();
    const formData = {
      firstname: this.state.signupForm.firstname.value,
      lastname: this.state.signupForm.lastname.value,
      email: this.state.signupForm.email.value,
      password: this.state.signupForm.password.value
    };
    const { onSetAlert, onSignup } = this.props;
    if (
      this.state.signupForm.password.value !==
      this.state.signupForm.confirmPassword.value
    ) {
      onSetAlert('Passwords do not match', 'Danger');
    } else {
      onSignup(formData);
    }
  };

  render() {
    const formElementsArray = [];
    for (const key in this.state.signupForm) {
      formElementsArray.push({
        id: key,
        config: this.state.signupForm[key]
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
      <div className={classes.Signup}>
        <div className={classes.Card}>
          <div className={classes.Title}>
            <h1>CREATE ACCOUNT</h1>
          </div>
          <div className={classes.Form}>
            <form onSubmit={this.formSubmitHandler}>
              {form}
              <Button
                btnType="Primary"
                disabled={!this.state.formIsValid || this.props.loading}
              >
                {this.props.loading ? 'Registering...' : 'Register'}
              </Button>
            </form>
            <div className={classes.LoginLink}>
              Already have an account? <Link to="/login">Login</Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Signup.propTypes = {
  onSetAlert: PropTypes.func,
  onSignup: PropTypes.func.isRequired,
  loading: PropTypes.bool
};

const mapStateToProps = state => ({
  loading: state.auth.loading,
  status: state.auth.status
});

const mapDispatchToProps = dispatch => ({
  onSetAlert: (message, alertType) =>
    dispatch(actions.setAlert(message, alertType)),
  onSignup: formData => dispatch(actions.signup(formData))
});

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
