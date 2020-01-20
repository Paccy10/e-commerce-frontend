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
    this.props.onFetchBrands();
  }

  onCreate = () => {
    this.props.history.push('/admin/brands/create');
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
                <td>
                  {brand.name.charAt(0).toUpperCase() + brand.name.substring(1)}
                </td>
                <td>{brand.description}</td>
                <td>
                  <Button btnType="Warning">View</Button>
                </td>
                <td>
                  <Button btnType="Primary">Edit</Button>
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
  brands: PropTypes.array
};

const mapStateToProps = state => ({
  loading: state.brand.loading,
  brands: state.brand.brands
});

const mapDispatchToProps = dispatch => ({
  onFetchBrands: () => dispatch(actions.fetchBrands())
});

export default connect(mapStateToProps, mapDispatchToProps)(Index);
