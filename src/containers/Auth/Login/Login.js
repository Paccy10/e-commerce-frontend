import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Input from '../../../components/UI/Input/Input';
import Button from '../../../components/UI/Button/Button';
import classes from './Login.module.css';
import checkValidity from '../../../utils/checkValidity';
import * as actions from '../../../store/actions';

export class Login extends Component {
  state = {
    loginForm: {
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
          required: true
        },
        valid: false,
        touched: false,
        errorMessage: ''
      }
    },
    formIsValid: false
  };

  inputChangeHandler = (event, inputName) => {
    const updatedLoginForm = {
      ...this.state.loginForm,
      [inputName]: {
        ...this.state.loginForm[inputName],
        value: event.target.value,
        valid: checkValidity(
          event.target.value,
          this.state.loginForm[inputName].validation
        ).isValid,
        touched: true,
        errorMessage: checkValidity(
          event.target.value,
          this.state.loginForm[inputName].validation
        ).message
      }
    };

    let formIsValid = true;
    for (const inputIdentifier in updatedLoginForm) {
      formIsValid = updatedLoginForm[inputIdentifier].valid && formIsValid;
    }
    this.setState({ loginForm: updatedLoginForm, formIsValid });
  };

  formSubmitHandler = event => {
    event.preventDefault();

    const formData = {
      email: this.state.loginForm.email.value,
      password: this.state.loginForm.password.value
    };
    const { onLogin } = this.props;
    onLogin(formData);
  };

  render() {
    const formElementsArray = [];

    for (const key in this.state.loginForm) {
      formElementsArray.push({
        id: key,
        config: this.state.loginForm[key]
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

    let authRedirect = null;
    if (this.props.isAuthenticated) {
      authRedirect = <Redirect to={this.props.authRedirectPath} />;
    }

    return (
      <div className={classes.Login}>
        {authRedirect}
        <div className={classes.Card}>
          <div className={classes.Title}>
            <h1>SIGNIN</h1>
          </div>
          <div className={classes.Form}>
            <form onSubmit={this.formSubmitHandler}>
              {form}
              <Button
                btnType="Primary"
                disabled={!this.state.formIsValid || this.props.loading}
              >
                {this.props.loading ? 'Verifying...' : 'Login'}
              </Button>
            </form>
            <div className={classes.Links}>
              <span>
                <Link to="/">Forgot Password</Link>
              </span>
              <span>
                Don&apos;t have an account? <Link to="/register">Register</Link>
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  onLogin: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  isAuthenticated: PropTypes.bool,
  authRedirectPath: PropTypes.string
};

const mapStateToProps = state => ({
  loading: state.auth.loading,
  authRedirectPath: state.auth.authRedirectPath,
  isAuthenticated: state.auth.token !== null
});

const mapDispatchToProps = dispatch => ({
  onLogin: FormData => dispatch(actions.login(FormData))
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
