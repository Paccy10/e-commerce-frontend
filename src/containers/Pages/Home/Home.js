/* eslint-disable no-plusplus */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/forbid-prop-types */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Aux from '../../../hoc/Aux/Aux';
import classes from './Home.module.css';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Product from '../../../components/Product/Product';
import * as actions from '../../../store/actions';

export class Home extends Component {
  async componentDidMount() {
    await this.props.onFetchCategories();
    this.props.onFetchProducts();
  }

  onMoreProducts = () => {
    this.props.history.push('/products');
  };

  render() {
    let products = <Spinner />;

    if (!this.props.loading) {
      const productsArray = [];
      for (let i = 0; i < this.props.products.length; i++) {
        productsArray.push(this.props.products[i]);
        if (i === 7) {
          break;
        }
      }
      products = (
        <Aux>
          <section className={classes.Main}>
            <div className={classes.MainText}>
              <h1>
                Revolutionary <br />
                Online Shopping
              </h1>
              <p>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Doloribus quae tenetur esse dolore officiis aliquid! Provident
                molestiae consequatur illum! Similique fuga hic ab omnis
                dolores, odit repellat sit quisquam accusantium?
              </p>
              <Button btnType="Primary" clicked={() => {}}>
                Shop With Us
              </Button>
            </div>
          </section>
          <section className={classes.Products}>
            <h1>New Products</h1>
            <div className={classes.Row}>
              {productsArray.map((product, index) => {
                const category = this.props.categories.map(cat => {
                  if (cat.id === product.category_id) {
                    return cat.name;
                  }
                  return null;
                });
                return (
                  <Link key={index} to={`/products/${product.id}`}>
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
            <div className={classes.MoreProductsLink}>
              <Button btnType="Primary" onClick={this.onMoreProducts}>
                More Products
              </Button>
            </div>
          </section>
        </Aux>
      );
    }
    return <Aux>{products}</Aux>;
  }
}

Home.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(Home);
