/* eslint-disable react/no-array-index-key */
/* eslint-disable react/forbid-prop-types */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Layout from '../../../Layout/Layout';
import classes from './Index.module.css';
import Button from '../../../../../components/UI/Button/Button';
import Spinner from '../../../../../components/UI/Spinner/Spinner';
import Modal from '../../../../../components/UI/Modal/Modal';
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
                <td className={classes.Name}>
                  {brand.name.charAt(0).toUpperCase() + brand.name.substring(1)}
                </td>
                <td>{brand.description}</td>
                <td>
                  <Button btnType="Primary" onClick={() => this.onEdit(brand)}>
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
    let deleteModal = null;
    if (this.state.deleting) {
      const deleteSummary = this.props.loading ? (
        <Spinner />
      ) : (
        <DeleteSummary
          cancelHandler={this.deleteCancelHandler}
          continueHandler={this.deleteContinueHandler}
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
          <p>
            <strong>ID: </strong> {this.state.brand.id}
          </p>
          <p>
            <strong>Name: </strong> {this.state.brand.name}
          </p>
          <p>
            <strong>Description: </strong> {this.state.brand.description}
          </p>
        </DeleteSummary>
      );
      deleteModal = (
        <Modal
          show={this.state.deleting}
          modalClosed={this.deleteCancelHandler}
        >
          {deleteSummary}
        </Modal>
      );
    }

    return (
      <Layout>
        <div className={classes.Header}>
          {deleteModal}
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
