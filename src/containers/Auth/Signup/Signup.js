import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Input from '../../../components/UI/Input/Input';
import Button from '../../../components/UI/Button/Button';
import classes from './Signup.module.css';
import checkValidity from '../../../utils/checkValidity';

class Signup extends Component {
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
            <form>
              {form}
              <Button
                btnType="Primary"
                disabled={!this.state.formIsValid}
                clicked={() => {}}
              >
                Register
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

export default Signup;
