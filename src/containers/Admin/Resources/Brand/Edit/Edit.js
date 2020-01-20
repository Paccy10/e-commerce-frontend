import React, { Component } from 'react';
import Layout from '../../../Layout/Layout';
import classes from './Edit.module.css';
import Button from '../../../../../components/UI/Button/Button';
import Input from '../../../../../components/UI/Input/Input';
import checkValidity from '../../../../../utils/checkValidity';

class Edit extends Component {
  state = {
    brandForm: {
      name: {
        elementType: 'input',
        label: 'Name',
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
      description: {
        elementType: 'textarea',
        label: 'Description',
        elementConfig: {},
        value: '',
        validation: {},
        valid: false,
        touched: false,
        errorMessage: ''
      }
    },
    formIsValid: false
  };

  inputChangeHandler = (event, inputName) => {
    const updatedBrandForm = {
      ...this.state.brandForm,
      [inputName]: {
        ...this.state.brandForm[inputName],
        value: event.target.value,
        valid: checkValidity(
          event.target.value,
          this.state.brandForm[inputName].validation
        ).isValid,
        touched: true,
        errorMessage: checkValidity(
          event.target.value,
          this.state.brandForm[inputName].validation
        ).message
      }
    };

    let formIsValid = true;
    for (const inputIdentifier in updatedBrandForm) {
      formIsValid = updatedBrandForm[inputIdentifier].valid && formIsValid;
    }
    this.setState({ brandForm: updatedBrandForm, formIsValid });
  };

  render() {
    const formElementsArray = [];

    for (const key in this.state.brandForm) {
      formElementsArray.push({
        id: key,
        config: this.state.brandForm[key]
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
      <Layout>
        <div className={classes.Header}>
          <h2 className={classes.Title}>Edit Brand</h2>
        </div>
        <div className={classes.Card}>
          <form onSubmit={this.formSubmitHandler}>
            {form}
            <Button btnType="Primary">Update Brand</Button>
          </form>
        </div>
      </Layout>
    );
  }
}

export default Edit;
