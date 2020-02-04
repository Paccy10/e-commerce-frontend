/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/no-array-index-key */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import classes from './Products.module.css';
import * as actions from '../../../store/actions';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Product from '../../../components/Product/Product';

class Products extends Component {
  async componentDidMount() {
    await this.props.onFetchCategories();
    this.props.onFetchProducts();
  }

  viewMoreDetails = productId => {
    this.props.history.push(`/products/${productId}`);
  };

  render() {
    let products = <Spinner />;
    if (!this.props.loading) {
      products = (
        <section>
          <div className={classes.Row}>
            {this.props.products.map((product, index) => {
              const category = this.props.categories.map(cat => {
                if (cat.id === product.category_id) {
                  return cat.name;
                }
                return null;
              });
              return (
                <Link key={index} to={`products/${product.id}`}>
                  <Product
                    mainImage={product.main_image.url}
                    category={category}
                    name={product.name}
                    description={
                      product.description.length > 80
                        ? `${product.description.substring(0, 80)}...`
                        : product.description
                    }
                    price={Math.trunc(product.price)
                      .toString()
                      .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}
                  />
                </Link>
              );
            })}
          </div>
        </section>
      );
    }
    return (
      <div className={classes.Products}>
        <h2>All Products</h2>
        <div className={classes.Content}>{products}</div>
      </div>
    );
  }
}

Products.propTypes = {
  onFetchProducts: PropTypes.func,
  products: PropTypes.array,
  loading: PropTypes.bool,
  onFetchCategories: PropTypes.func,
  categories: PropTypes.array,
  history: PropTypes.object
};

const mapStateToProps = state => ({
  loading: state.product.loading,
  products: state.product.products,
  categories: state.category.categories
});

const mapDispatchToProps = dispatch => ({
  onFetchProducts: () => dispatch(actions.fetchProducts()),
  onFetchCategories: () => dispatch(actions.fetchCategories())
});

export default connect(mapStateToProps, mapDispatchToProps)(Products);
