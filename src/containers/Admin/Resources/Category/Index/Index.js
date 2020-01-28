/* eslint-disable react/no-array-index-key */
/* eslint-disable react/forbid-prop-types */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Layout from '../../../Layout/Layout';
import classes from './Index.module.css';
import Button from '../../../../../components/UI/Button/Button';
import Spinner from '../../../../../components/UI/Spinner/Spinner';
import DeleteSummary from '../../../../../components/DeleteSummary/DeleteSummary';
import * as actions from '../../../../../store/actions';

export class Index extends Component {
  state = {
    deleting: false,
    category: null
  };

  componentDidMount() {
    this.props.onFetchCategories();
  }

  onCreate = () => {
    this.props.history.push('/admin/categories/create');
  };

  onDelete = category => {
    this.setState({ deleting: true, category });
  };

  onEdit = category => {
    this.props.history.push(`/admin/categories/${category.id}/edit`);
  };

  deleteCancelHandler = () => {
    this.setState({ deleting: false, category: null });
  };

  deleteContinueHandler = () => {
    this.props
      .onDeleteCategory(this.state.category.id, this.props.token)
      .then(() => {
        this.setState({ deleting: false, category: null });
      });
  };

  render() {
    let categories = <Spinner />;
    if (!this.props.loading) {
      categories = (
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Description</th>
              <th>Parent Catgory</th>
              <th colSpan="2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {this.props.categories.map((category, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td className={classes.Name}>
                  {category.name.charAt(0).toUpperCase() +
                    category.name.substring(1)}
                </td>
                <td>{category.description ? category.description : '-'}</td>
                <td>
                  {category.parent_id
                    ? this.props.categories.map(cat =>
                        cat.id === category.parent_id ? cat.name : null
                      )
                    : '-'}
                </td>
                <td>
                  <Button
                    btnType="Success"
                    onClick={() => this.onEdit(category)}
                  >
                    Edit
                  </Button>
                </td>
                <td>
                  <Button
                    btnType="Danger"
                    onClick={() => this.onDelete(category)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      );
    }
    let deleteSummary = null;
    if (this.state.deleting) {
      deleteSummary = this.props.loading ? (
        <Spinner />
      ) : (
        <DeleteSummary
          show={this.state.deleting}
          cancelHandler={this.deleteCancelHandler}
          continueHandler={this.deleteContinueHandler}
        >
          <p>
            {' '}
            Are you sure you want to delete{' '}
            <strong>
              {this.state.category.name.charAt(0).toUpperCase() +
                this.state.category.name.substring(1)}
            </strong>{' '}
            Category?
          </p>
        </DeleteSummary>
      );
    }

    return (
      <Layout>
        <div className={classes.Header}>
          {deleteSummary}
          <Button btnType="Primary" onClick={this.onCreate}>
            {' '}
            <i className="fas fa-folder-plus"></i>Create new Category
          </Button>
          <h2 className={classes.Title}>Manage Categories</h2>
        </div>
        <div className={classes.Card}>{categories}</div>
      </Layout>
    );
  }
}

Index.propTypes = {
  history: PropTypes.object,
  loading: PropTypes.bool,
  onFetchCategories: PropTypes.func.isRequired,
  categories: PropTypes.array,
  onDeleteCategory: PropTypes.func,
  token: PropTypes.string
};

const mapStateToProps = state => ({
  loading: state.category.loading,
  categories: state.category.categories,
  token: state.auth.token
});

const mapDispatchToProps = dispatch => ({
  onFetchCategories: () => dispatch(actions.fetchCategories()),
  onDeleteCategory: (categoryId, token) =>
    dispatch(actions.deleteCategory(categoryId, token))
});

export default connect(mapStateToProps, mapDispatchToProps)(Index);
