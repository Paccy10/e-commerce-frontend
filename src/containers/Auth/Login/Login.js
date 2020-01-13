import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Input from '../../../components/UI/Input/Input';
import Button from '../../../components/UI/Button/Button';
import classes from './Login.module.css';
import checkValidity from '../../../utils/checkValidity';

class Login extends Component {
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
    return (
      <div className={classes.Login}>
        <div className={classes.Card}>
          <div className={classes.Title}>
            <h1>SIGNIN</h1>
          </div>
          <div className={classes.Form}>
            <form>
              {form}
              <Button
                btnType="Primary"
                disabled={!this.state.formIsValid}
                clicked={() => {}}
              >
                Login
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

export default Login;
