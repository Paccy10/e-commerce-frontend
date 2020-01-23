/* eslint-disable camelcase */
/* eslint-disable react/forbid-prop-types */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Layout from '../../../Layout/Layout';
import classes from './Create.module.css';
import Button from '../../../../../components/UI/Button/Button';
import Input from '../../../../../components/UI/Input/Input';
import checkValidity from '../../../../../utils/checkValidity';
import * as actions from '../../../../../store/actions';

export class Create extends Component {
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
        valid: true,
        touched: false,
        errorMessage: ''
      }
    },
    formIsValid: false
  };

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.message === 'Brand successfully created') {
      this.props.history.push('/admin/brands');
    }
  }

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

  formSubmitHandler = event => {
    event.preventDefault();
    const formData = {
      name: this.state.brandForm.name.value,
      description: this.state.brandForm.description.value
    };
    const { onCreateBrand, token } = this.props;
    onCreateBrand(token, formData);
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
          <h2 className={classes.Title}>Create New Brand</h2>
        </div>
        <div className={classes.Card}>
          <form onSubmit={this.formSubmitHandler}>
            {form}
            <Button
              btnType="Primary"
              disabled={!this.state.formIsValid || this.props.loading}
            >
              {this.props.loading ? 'Saving...' : 'Create Brand'}
            </Button>
          </form>
        </div>
      </Layout>
    );
  }
}

Create.propTypes = {
  loading: PropTypes.bool,
  token: PropTypes.string,
  onCreateBrand: PropTypes.func,
  history: PropTypes.object,
  message: PropTypes.string
};

const mapStateToProps = state => ({
  token: state.auth.token,
  loading: state.brand.loading,
  message: state.brand.message
});

const mapDispatchToProps = dispatch => ({
  onCreateBrand: (formData, token) =>
    dispatch(actions.createBrand(formData, token))
});

export default connect(mapStateToProps, mapDispatchToProps)(Create);
