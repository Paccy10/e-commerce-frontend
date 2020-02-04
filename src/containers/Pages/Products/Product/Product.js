/* eslint-disable camelcase */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/sort-comp */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import classes from './Product.module.css';
import Button from '../../../../components/UI/Button/Button';
import Spinner from '../../../../components/UI/Spinner/Spinner';
import Aux from '../../../../hoc/Aux/Aux';
import * as actions from '../../../../store/actions';

class Product extends Component {
  state = {
    quantity: 1
  };

  async componentDidMount() {
    const { productId } = this.props.match.params;
    await this.props.onFetchProduct(productId);
    if (this.props.product.brand_id) {
      await this.props.onFetchBrand(this.props.product.brand_id);
    }
    await this.props.onFetchCategory(this.props.product.category_id);
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.message === 'Item successfully added to the cart') {
      this.props.history.push('/cart');
    }
  }

  imgRef = React.createRef();

  onOpenImage = event => {
    const mainImage = this.imgRef.current;
    mainImage.src = event.target.src;
  };

  ongoBack = () => {
    this.props.history.goBack();
  };

  onLogin = productId => {
    this.props.onSetAuthRedirectPath(`products/${productId}`);
    this.props.history.push('/login');
  };

  onAddQuantity = () => {
    const quantity = this.state.quantity + 1;
    this.setState({ quantity });
  };

  onRemoveQuantity = () => {
    const quantity = this.state.quantity - 1;
    this.setState({ quantity });
  };

  onAddProductToCart = () => {
    const body = {
      product_id: this.props.product.id,
      quantity: this.state.quantity
    };
    this.props.onAddItemToCart(this.props.token, body);
  };

  render() {
    let product = <Spinner />;
    if (!this.props.loading && this.props.product && this.props.category) {
      product = (
        <Aux>
          <div className={classes.Images}>
            <div className={classes.MainImage}>
              <img
                ref={this.imgRef}
                src={this.props.product.main_image.url}
                alt=""
              />
            </div>
            <div className={classes.SmallIMages}>
              <img
                src={this.props.product.main_image.url}
                alt=""
                onClick={this.onOpenImage}
              />
              {this.props.product.images
                ? this.props.product.images.map(image => {
                    return (
                      <img
                        key={image.public_id}
                        src={image.url}
                        alt=""
                        onClick={this.onOpenImage}
                      />
                    );
                  })
                : null}
            </div>
          </div>
          <div className={classes.Details}>
            <h3>{this.props.product.name}</h3>
            <p>{this.props.product.description}</p>
            <p>
              <strong>Category: </strong> {this.props.category.name}
            </p>
            <p>
              <strong>Brand: </strong>
              {this.props.product.brand_id
                ? this.props.brands.map(brand => {
                    if (this.props.product.brand_id === brand.id) {
                      return brand.name;
                    }
                    return null;
                  })
                : 'None'}
            </p>
            <p>
              <strong>Price: </strong>{' '}
              {Math.trunc(this.props.product.price)
                .toString()
                .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}
            </p>
            <p>
              <strong>Quantity: </strong>
              <Button
                btnType="Primary"
                disabled={this.state.quantity === 1}
                onClick={this.onRemoveQuantity}
              >
                -
              </Button>
              <span>{this.state.quantity}</span>
              <Button
                btnType="Primary"
                onClick={this.onAddQuantity}
                disabled={this.state.quantity === this.props.product.quantity}
              >
                +
              </Button>
            </p>
            {this.props.isAuthenticated ? (
              <Button
                btnType="Warning"
                onClick={this.onAddProductToCart}
                disabled={this.props.cartLoading}
              >
                {this.props.cartLoading ? 'Adding Product...' : 'Add To Cart'}
              </Button>
            ) : (
              <Button
                btnType="Warning"
                onClick={() => this.onLogin(this.props.product.id)}
              >
                Login To Buy
              </Button>
            )}
            <Button btnType="Success" onClick={this.ongoBack}>
              Go Back
            </Button>
          </div>
        </Aux>
      );
    }

    return (
      <div className={classes.Product}>
        <div className={classes.Card}>{product}</div>
      </div>
    );
  }
}

Product.propTypes = {
  loading: PropTypes.bool,
  onFetchProduct: PropTypes.func,
  match: PropTypes.object,
  product: PropTypes.object,
  brands: PropTypes.array,
  category: PropTypes.object,
  onFetchBrand: PropTypes.func,
  onFetchCategory: PropTypes.func,
  token: PropTypes.string,
  history: PropTypes.object,
  isAuthenticated: PropTypes.bool,
  onSetAuthRedirectPath: PropTypes.func,
  onAddItemToCart: PropTypes.func,
  message: PropTypes.string,
  cartLoading: PropTypes.bool
};

const mapSateToProps = state => ({
  loading: state.product.loading,
  cartLoading: state.cart.loading,
  product: state.product.products[0],
  brands: state.brand.brands,
  message: state.cart.message,
  category: state.category.categories[0],
  token: state.auth.token,
  isAuthenticated: state.auth.token !== null
});

const mapStateToDispatch = dispatch => ({
  onFetchProduct: productId => dispatch(actions.fetchProduct(productId)),
  onFetchBrand: brandId => dispatch(actions.fetchBrand(brandId)),
  onFetchCategory: categoryId => dispatch(actions.fetchCategory(categoryId)),
  onSetAuthRedirectPath: path => dispatch(actions.setAuthRedirectPath(path)),
  onAddItemToCart: (token, body) => dispatch(actions.addItemToCart(token, body))
});

export default connect(mapSateToProps, mapStateToDispatch)(Product);
