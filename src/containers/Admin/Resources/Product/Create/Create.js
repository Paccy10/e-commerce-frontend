/* eslint-disable radix */
/* eslint-disable camelcase */
/* eslint-disable react/forbid-prop-types */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import axios from 'axios';
import Layout from '../../../Layout/Layout';
import classes from './Create.module.css';
import Button from '../../../../../components/UI/Button/Button';
import Input from '../../../../../components/UI/Input/Input';
import checkValidity from '../../../../../utils/checkValidity';
import * as actions from '../../../../../store/actions';
import Spinner from '../../../../../components/UI/Spinner/Spinner';

export class Create extends Component {
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
        validation: {
          required: true
        },
        valid: false,
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
    },
    files: {
      mainImage: {},
      images: []
    },
    formIsValid: false,
    loading: false,
    mainImage: null,
    images: null
  };

  componentDidMount() {
    this.setState({ loading: true });
    this.props.onFetchCategories().then(() => {
      this.props.onFetchBrands().then(() => {
        this.props.categories.map(category => {
          const option = {
            displayValue: category.name,
            value: category.id
          };
          return this.state.productForm.category.elementConfig.options.push(
            option
          );
        });
        this.props.brands.map(brand => {
          const option = {
            displayValue: brand.name,
            value: brand.id
          };
          return this.state.productForm.brand.elementConfig.options.push(
            option
          );
        });
        this.setState({ loading: false });
      });
    });
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.message === 'Product successfully created') {
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

    if (this.state.productForm[inputName].elementConfig.type === 'file') {
      if (inputName === 'mainImage') {
        // eslint-disable-next-line prefer-destructuring
        this.state.files.mainImage = event.target.files[0];
      } else {
        for (const key in event.target.files) {
          if (key !== 'length' && key !== 'item') {
            this.state.files.images.push(event.target.files[key]);
          }
        }
      }
    }

    let formIsValid = true;
    for (const inputIdentifier in updatedProductForm) {
      formIsValid = updatedProductForm[inputIdentifier].valid && formIsValid;
    }
    this.setState({ productForm: updatedProductForm, formIsValid });
  };

  uploadMainImage = image => {
    const formData = new FormData();
    formData.append('file', image);
    formData.append('upload_preset', 'arrows');
    formData.append('api_key', process.env.CLOUDINARY_API_KEY);

    return axios
      .post(
        'https://api.cloudinary.com/v1_1/dhsoe7agl/image/upload',
        formData,
        {
          headers: { 'X-Requested-With': 'XMLHttpRequest' }
        }
      )
      .then(response => {
        return response.data;
      })
      .catch(error => {
        this.props.onSetAlert(error.response.data.error.message, 'Danger');
      });
  };

  uploadOtherImages = images => {
    const uploadedImages = [];
    const uploaders = images.map(image => {
      const formData = new FormData();
      formData.append('file', image);
      formData.append('upload_preset', 'arrows');
      formData.append('api_key', process.env.CLOUDINARY_API_KEY);

      return axios
        .post(
          'https://api.cloudinary.com/v1_1/dhsoe7agl/image/upload',
          formData,
          {
            headers: { 'X-Requested-With': 'XMLHttpRequest' }
          }
        )
        .then(response => {
          uploadedImages.push(response.data);
        })
        .catch(error => {
          this.props.onSetAlert(error.response.data.error.message, 'Danger');
        });
    });
    return axios.all(uploaders).then(() => {
      return uploadedImages;
    });
  };

  formSubmitHandler = async event => {
    event.preventDefault();
    this.props.onCreateProductStart();
    if (!this.state.mainImage) {
      const uploadedMainImage = await this.uploadMainImage(
        this.state.files.mainImage
      );
      this.setState({ mainImage: uploadedMainImage });
    }

    if (this.state.files.images && !this.state.images) {
      const uploadedOtherImages = await this.uploadOtherImages(
        this.state.files.images
      );
      this.setState({ images: uploadedOtherImages });
    }

    const main_image = {
      url: this.state.mainImage.secure_url,
      public_id: this.state.mainImage.public_id
    };

    const images = this.state.images.map(image => ({
      url: image.secure_url,
      public_id: image.public_id
    }));

    const formData = {
      name: this.state.productForm.name.value,
      description: this.state.productForm.description.value,
      category_id: parseInt(this.state.productForm.category.value),
      brand_id: this.state.productForm.brand.value,
      main_image,
      images,
      price: parseInt(this.state.productForm.price.value),
      quantity: parseInt(this.state.productForm.quantity.value)
    };

    if (formData.brand_id === '') {
      delete formData.brand_id;
    } else {
      formData.brand_id = parseInt(formData.brand_id);
    }

    const { onCreateProduct, token } = this.props;
    onCreateProduct(token, formData);
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
            {this.props.loading ? 'Saving...' : 'Create Product'}
          </Button>
        </form>
      );
    }

    return (
      <Layout>
        <div className={classes.Header}>
          <h2 className={classes.Title}>Create New Product</h2>
        </div>
        <div className={classes.Card}>{product}</div>
      </Layout>
    );
  }
}

Create.propTypes = {
  loading: PropTypes.bool,
  token: PropTypes.string,
  onCreateProduct: PropTypes.func,
  history: PropTypes.object,
  onFetchCategories: PropTypes.func,
  onFetchBrands: PropTypes.func,
  categories: PropTypes.array,
  brands: PropTypes.array,
  message: PropTypes.string,
  onSetAlert: PropTypes.func,
  onCreateProductStart: PropTypes.func
};

const mapStateToProps = state => ({
  token: state.auth.token,
  loading: state.product.loading,
  message: state.product.message,
  categories: state.category.categories,
  brands: state.brand.brands
});

const mapDispatchToProps = dispatch => ({
  onCreateProduct: (formData, token) =>
    dispatch(actions.createProduct(formData, token)),
  onFetchCategories: () => dispatch(actions.fetchCategories()),
  onFetchBrands: () => dispatch(actions.fetchBrands()),
  onSetAlert: (message, alertType) =>
    dispatch(actions.setAlert(message, alertType)),
  onCreateProductStart: () => dispatch(actions.createProductStart())
});

export default connect(mapStateToProps, mapDispatchToProps)(Create);
