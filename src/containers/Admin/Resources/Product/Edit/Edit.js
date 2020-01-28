/* eslint-disable camelcase */
/* eslint-disable radix */
/* eslint-disable react/forbid-prop-types */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Layout from '../../../Layout/Layout';
import classes from './Edit.module.css';
import Button from '../../../../../components/UI/Button/Button';
import Input from '../../../../../components/UI/Input/Input';
import checkValidity from '../../../../../utils/checkValidity';
import * as actions from '../../../../../store/actions';
import Spinner from '../../../../../components/UI/Spinner/Spinner';

class Edit extends Component {
  state = {
    productForm: {
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
      },
      category: {
        elementType: 'select',
        label: 'Category',
        elementConfig: {
          options: [{ displayValue: 'Select Category', value: '' }]
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        errorMessage: ''
      },
      brand: {
        elementType: 'select',
        label: 'Brand',
        elementConfig: {
          options: [{ displayValue: 'Select Brand', value: '' }]
        },
        value: '',
        validation: {},
        valid: true,
        touched: false,
        errorMessage: ''
      },
      mainImage: {
        elementType: 'input',
        label: 'Main Image',
        elementConfig: {
          type: 'file'
        },
        value: '',
        validation: {},
        valid: true,
        touched: false,
        errorMessage: ''
      },
      images: {
        elementType: 'input',
        label: 'Other Images',
        elementConfig: {
          type: 'file',
          multiple: true
        },
        value: '',
        validation: {},
        valid: true,
        touched: false,
        errorMessage: ''
      },
      price: {
        elementType: 'input',
        label: 'Price',
        elementConfig: {
          type: 'number'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        errorMessage: ''
      },
      quantity: {
        elementType: 'input',
        label: 'Quantity',
        elementConfig: {
          type: 'number'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        errorMessage: ''
      }
    }
  };

  async componentDidMount() {
    this.setState({ loading: true });
    await this.props.onFetchProduct(this.props.match.params.productId);
    await this.props.onFetchCategories();
    await this.props.onFetchBrands();
    this.props.categories.map(category => {
      const option = {
        displayValue: category.name,
        value: category.id
      };
      return this.state.productForm.category.elementConfig.options.push(option);
    });
    this.props.brands.map(brand => {
      const option = {
        displayValue: brand.name,
        value: brand.id
      };
      return this.state.productForm.brand.elementConfig.options.push(option);
    });
    const updatedProductForm = {
      ...this.state.productForm
    };
    updatedProductForm.name.value = this.props.product.name;
    updatedProductForm.name.valid = true;
    updatedProductForm.description.value = this.props.product.description;
    updatedProductForm.category.value = `${this.props.product.category_id}`;
    updatedProductForm.category.valid = true;
    updatedProductForm.brand.value = this.props.product.brand_id
      ? `${this.props.product.brand_id}`
      : '';
    updatedProductForm.quantity.value = `${this.props.product.quantity}`;
    updatedProductForm.quantity.valid = true;
    updatedProductForm.price.value = `${this.props.product.price}`;
    updatedProductForm.price.valid = true;
    this.setState({ formIsValid: true, loading: false });
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.message === 'Product successfully updated') {
      this.props.history.push('/admin/products');
    }
  }

  inputChangeHandler = (event, inputName) => {
    const updatedProductForm = {
      ...this.state.productForm,
      [inputName]: {
        ...this.state.productForm[inputName],
        value: event.target.value,
        valid: checkValidity(
          event.target.value,
          this.state.productForm[inputName].validation
        ).isValid,
        touched: true,
        errorMessage: checkValidity(
          event.target.value,
          this.state.productForm[inputName].validation
        ).message
      }
    };

    let formIsValid = true;
    for (const inputIdentifier in updatedProductForm) {
      formIsValid = updatedProductForm[inputIdentifier].valid && formIsValid;
    }
    this.setState({ productForm: updatedProductForm, formIsValid });
  };

  formSubmitHandler = async event => {
    event.preventDefault();
    this.props.onUpdateProductStart();

    const formData = {
      name: this.state.productForm.name.value,
      description: this.state.productForm.description.value,
      category_id: parseInt(this.state.productForm.category.value),
      brand_id: this.state.productForm.brand.value,
      price: parseInt(this.state.productForm.price.value),
      quantity: parseInt(this.state.productForm.quantity.value)
    };

    if (formData.brand_id === '') {
      delete formData.brand_id;
    } else {
      formData.brand_id = parseInt(formData.brand_id);
    }

    const { onUpdateProduct, token, match } = this.props;
    onUpdateProduct(token, match.params.productId, formData);
  };

  render() {
    const formElementsArray = [];

    for (const key in this.state.productForm) {
      formElementsArray.push({
        id: key,
        config: this.state.productForm[key]
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

    let product = <Spinner />;
    if (!this.state.loading) {
      product = (
        <form onSubmit={this.formSubmitHandler}>
          {form}
          <Button
            btnType="Primary"
            disabled={!this.state.formIsValid || this.props.loading}
          >
            {this.props.loading ? 'Saving Changes...' : 'Update Product'}
          </Button>
        </form>
      );
    }
    return (
      <Layout>
        <div className={classes.Header}>
          <h2 className={classes.Title}>Edit Product</h2>
        </div>
        <div className={classes.Card}>{product}</div>
      </Layout>
    );
  }
}

Edit.propTypes = {
  loading: PropTypes.bool,
  product: PropTypes.object,
  categories: PropTypes.array,
  brands: PropTypes.array,
  onFetchCategories: PropTypes.func,
  onFetchBrands: PropTypes.func,
  match: PropTypes.object,
  onFetchProduct: PropTypes.func,
  onUpdateProductStart: PropTypes.func,
  onUpdateProduct: PropTypes.func,
  token: PropTypes.string,
  message: PropTypes.string,
  history: PropTypes.object
};

const mapStateToProps = state => ({
  loading: state.product.loading,
  product: state.product.products[0],
  categories: state.category.categories,
  brands: state.brand.brands,
  token: state.auth.token,
  message: state.product.message
});

const mapDispatchToProps = dispatch => ({
  onFetchProduct: productId => dispatch(actions.fetchProduct(productId)),
  onFetchCategories: () => dispatch(actions.fetchCategories()),
  onFetchBrands: () => dispatch(actions.fetchBrands()),
  onUpdateProductStart: () => dispatch(actions.updateProductStart()),
  onUpdateProduct: (token, productId, formData) =>
    dispatch(actions.updateProduct(token, productId, formData))
});

export default connect(mapStateToProps, mapDispatchToProps)(Edit);
