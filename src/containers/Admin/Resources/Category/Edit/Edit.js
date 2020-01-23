/* eslint-disable no-plusplus */
/* eslint-disable radix */
/* eslint-disable camelcase */
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
    categoryForm: {
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
      parentCategory: {
        elementType: 'select',
        label: 'Parent Category',
        elementConfig: {
          options: [{ displayValue: 'Select Category', value: '' }]
        },
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
      onFetchCategories
    } = this.props;
    onFetchCategories().then(() => {
      const updatedCategoryForm = {
        ...this.state.categoryForm
      };
      const { categories } = this.props;
      let editCategory;
      for (let i = 0; i < categories.length; i++) {
        if (categories[i].id === parseInt(params.categoryId)) {
          editCategory = categories[i];
        }
      }

      updatedCategoryForm.name.value = editCategory.name;
      updatedCategoryForm.name.valid = true;
      updatedCategoryForm.description.value = editCategory.description;
      this.props.categories.map(category => {
        const option = {
          displayValue: category.name,
          value: category.id
        };
        return this.state.categoryForm.parentCategory.elementConfig.options.push(
          option
        );
      });
      updatedCategoryForm.parentCategory.value = editCategory.parent_id
        ? `${editCategory.parent_id}`
        : '';
      this.setState({
        formIsValid: true,
        loading: false
      });
    });
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.message === 'Category successfully updated') {
      this.props.history.push('/admin/categories');
    }
  }

  inputChangeHandler = (event, inputName) => {
    const updatedCategoryForm = {
      ...this.state.categoryForm,
      [inputName]: {
        ...this.state.categoryForm[inputName],
        value: event.target.value,
        valid: checkValidity(
          event.target.value,
          this.state.categoryForm[inputName].validation
        ).isValid,
        touched: true,
        errorMessage: checkValidity(
          event.target.value,
          this.state.categoryForm[inputName].validation
        ).message
      }
    };

    let formIsValid = true;
    for (const inputIdentifier in updatedCategoryForm) {
      formIsValid = updatedCategoryForm[inputIdentifier].valid && formIsValid;
    }
    this.setState({ categoryForm: updatedCategoryForm, formIsValid });
  };

  formSubmitHandler = event => {
    event.preventDefault();
    const formData = {
      name: this.state.categoryForm.name.value,
      description: this.state.categoryForm.description.value,
      parent_id: this.state.categoryForm.parentCategory.value
    };

    if (formData.parent_id === '') {
      delete formData.parent_id;
    }

    const {
      onUpdateCategory,
      token,
      match: { params }
    } = this.props;
    onUpdateCategory(token, params.categoryId, formData);
  };

  render() {
    const formElementsArray = [];

    for (const key in this.state.categoryForm) {
      formElementsArray.push({
        id: key,
        config: this.state.categoryForm[key]
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

    let category = <Spinner />;
    if (!this.state.loading) {
      category = (
        <form onSubmit={this.formSubmitHandler}>
          {form}
          <Button
            btnType="Primary"
            disabled={!this.state.formIsValid || this.props.loading}
          >
            {this.props.loading ? 'Saving Changes...' : 'Update Category'}
          </Button>
        </form>
      );
    }

    return (
      <Layout>
        <div className={classes.Header}>
          <h2 className={classes.Title}>Edit Category</h2>
        </div>
        <div className={classes.Card}>{category}</div>
      </Layout>
    );
  }
}

Edit.propTypes = {
  match: PropTypes.object,
  loading: PropTypes.bool,
  categories: PropTypes.array,
  token: PropTypes.string,
  onUpdateCategory: PropTypes.func,
  history: PropTypes.object,
  message: PropTypes.string,
  onFetchCategories: PropTypes.func
};

const mapStateToProps = state => ({
  loading: state.category.loading,
  message: state.category.message,
  token: state.auth.token,
  categories: state.category.categories
});

const mapDispatchToProps = dispatch => ({
  onUpdateCategory: (token, categoryId, FormData) =>
    dispatch(actions.updateCategory(token, categoryId, FormData)),
  onFetchCategories: () => dispatch(actions.fetchCategories())
});

export default connect(mapStateToProps, mapDispatchToProps)(Edit);
