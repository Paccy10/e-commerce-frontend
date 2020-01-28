/* eslint-disable react/no-array-index-key */
/* eslint-disable react/forbid-prop-types */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Layout from '../../../Layout/Layout';
import classes from './Index.module.css';
import Button from '../../../../../components/UI/Button/Button';
import Spinner from '../../../../../components/UI/Spinner/Spinner';
import * as actions from '../../../../../store/actions';

export class Index extends Component {
  componentDidMount() {
    this.props.onFetchProducts();
  }

  onCreate = () => {
    this.props.history.push('/admin/products/create');
  };

  onView = product => {
    this.props.history.push(`/admin/products/${product.id}`);
  };

  onEdit = product => {
    this.props.history.push(`/admin/products/${product.id}/edit`);
  };

  render() {
    let products = <Spinner />;
    if (!this.props.loading) {
      products = (
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Description</th>
              <th>Price</th>
              <th>Quantity</th>
              <th colSpan="2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {this.props.products.map((product, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td className={classes.Name}>
                  {product.name.charAt(0).toUpperCase() +
                    product.name.substring(1)}
                </td>
                <td>{product.description ? product.description : '-'}</td>
                <td>{product.price}</td>
                <td>{product.quantity}</td>
                <td>
                  <Button
                    btnType="Warning"
                    onClick={() => this.onView(product)}
                  >
                    View
                  </Button>
                </td>
                <td>
                  <Button
                    btnType="Success"
                    onClick={() => this.onEdit(product)}
                  >
                    Edit
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      );
    }

    return (
      <Layout>
        <div className={classes.Header}>
          <Button btnType="Primary" onClick={this.onCreate}>
            {' '}
            <i className="fas fa-folder-plus"></i>Create new Product
          </Button>
          <h2 className={classes.Title}>Manage Products</h2>
        </div>
        <div className={classes.Card}>{products}</div>
      </Layout>
    );
  }
}

Index.propTypes = {
  history: PropTypes.object,
  loading: PropTypes.bool,
  onFetchProducts: PropTypes.func.isRequired,
  products: PropTypes.array
};

const mapStateToProps = state => ({
  loading: state.product.loading,
  products: state.product.products
});

const mapDispatchToProps = dispatch => ({
  onFetchProducts: () => dispatch(actions.fetchProducts())
});

export default connect(mapStateToProps, mapDispatchToProps)(Index);
