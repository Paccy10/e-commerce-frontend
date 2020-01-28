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
    brand: null
  };

  componentDidMount() {
    this.props.onFetchBrands();
  }

  onCreate = () => {
    this.props.history.push('/admin/brands/create');
  };

  onDelete = brand => {
    this.setState({ deleting: true, brand });
  };

  onEdit = brand => {
    this.props.history.push(`/admin/brands/${brand.id}/edit`);
  };

  deleteCancelHandler = () => {
    this.setState({ deleting: false, brand: null });
  };

  deleteContinueHandler = () => {
    this.props.onDeleteBrand(this.state.brand.id, this.props.token).then(() => {
      this.setState({ deleting: false, brand: null });
    });
  };

  render() {
    let brands = <Spinner />;
    if (!this.props.loading) {
      brands = (
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Description</th>
              <th colSpan="2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {this.props.brands.map((brand, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td className={classes.Name}>{brand.name}</td>
                <td>{brand.description}</td>
                <td>
                  <Button btnType="Success" onClick={() => this.onEdit(brand)}>
                    Edit
                  </Button>
                </td>
                <td>
                  <Button btnType="Danger" onClick={() => this.onDelete(brand)}>
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
          cancelHandler={this.deleteCancelHandler}
          continueHandler={this.deleteContinueHandler}
          show={this.state.deleting}
        >
          <p>
            {' '}
            Are you sure you want to delete{' '}
            <strong>
              {this.state.brand.name.charAt(0).toUpperCase() +
                this.state.brand.name.substring(1)}
            </strong>{' '}
            Brand?
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
            <i className="fas fa-folder-plus"></i>Create new Brand
          </Button>
          <h2 className={classes.Title}>Manage Brands</h2>
        </div>
        <div className={classes.Card}>{brands}</div>
      </Layout>
    );
  }
}

Index.propTypes = {
  history: PropTypes.object,
  loading: PropTypes.bool,
  onFetchBrands: PropTypes.func.isRequired,
  brands: PropTypes.array,
  onDeleteBrand: PropTypes.func,
  token: PropTypes.string
};

const mapStateToProps = state => ({
  loading: state.brand.loading,
  brands: state.brand.brands,
  token: state.auth.token
});

const mapDispatchToProps = dispatch => ({
  onFetchBrands: () => dispatch(actions.fetchBrands()),
  onDeleteBrand: (brandId, token) =>
    dispatch(actions.deleteBrand(brandId, token))
});

export default connect(mapStateToProps, mapDispatchToProps)(Index);
