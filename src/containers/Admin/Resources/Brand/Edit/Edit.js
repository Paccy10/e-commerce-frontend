/* eslint-disable react/forbid-prop-types */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Layout from '../../../Layout/Layout';
import classes from './Edit.module.css';
import Button from '../../../../../components/UI/Button/Button';
import Input from '../../../../../components/UI/Input/Input';
import Spinner from '../../../../../components/UI/Spinner/Spinner';
import checkValidity from '../../../../../utils/checkValidity';
import * as actions from '../../../../../store/actions';

export class Edit extends Component {
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
    formIsValid: false,
    loading: false
  };

  componentDidMount() {
    this.setState({ loading: true });
    const {
      match: { params },
      onFetchBrand
    } = this.props;
    onFetchBrand(params.brandId)
      .then(() => {
        const updatedBrandForm = {
          ...this.state.brandForm
        };
        updatedBrandForm.name.value = this.props.brand.name;
        updatedBrandForm.name.valid = true;
        updatedBrandForm.description.value = this.props.brand.description;
        this.setState({
          brandForm: updatedBrandForm,
          formIsValid: true,
          loading: false
        });
      })
      .catch(() => {});
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
    const {
      onUpdateBrand,
      token,
      match: { params }
    } = this.props;
    onUpdateBrand(token, params.brandId, formData)
      .then(() => {
        this.props.history.push('/admin/brands');
      })
      .catch(() => {});
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

    let brand = <Spinner />;
    if (!this.state.loading) {
      brand = (
        <form onSubmit={this.formSubmitHandler}>
          {form}
          <Button
            btnType="Primary"
            disabled={!this.state.formIsValid || this.props.loading}
          >
            {this.props.loading ? 'Saving Changes...' : 'Update Brand'}
          </Button>
        </form>
      );
    }

    return (
      <Layout>
        <div className={classes.Header}>
          <h2 className={classes.Title}>Edit Brand</h2>
        </div>
        <div className={classes.Card}>{brand}</div>
      </Layout>
    );
  }
}

Edit.propTypes = {
  match: PropTypes.object,
  onFetchBrand: PropTypes.func,
  loading: PropTypes.bool,
  brand: PropTypes.object,
  token: PropTypes.string,
  onUpdateBrand: PropTypes.func,
  history: PropTypes.object
};

const mapStateToProps = state => ({
  loading: state.brand.loading,
  brand: state.brand.brands[0],
  token: state.auth.token
});

const mapDispatchToProps = dispatch => ({
  onFetchBrand: brandId => dispatch(actions.fetchBrand(brandId)),
  onUpdateBrand: (token, brandId, FormData) =>
    dispatch(actions.updateBrand(token, brandId, FormData))
});

export default connect(mapStateToProps, mapDispatchToProps)(Edit);
