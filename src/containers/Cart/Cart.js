/* eslint-disable react/no-array-index-key */
/* eslint-disable react/forbid-prop-types */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import classes from './Cart.module.css';
import * as actions from '../../store/actions';
import Spinner from '../../components/UI/Spinner/Spinner';
import Button from '../../components/UI/Button/Button';
import DeleteSummary from '../../components/DeleteSummary/DeleteSummary';
import CartItem from '../../components/CartItem/CartItem';

class Cart extends Component {
  state = {
    deleting: false,
    item: null
  };

  componentDidMount() {
    this.props.onFetchCart(this.props.token);
  }

  onBrowseProducts = () => {
    this.props.history.push('/products');
  };

  onRemoveItem = item => {
    this.setState({ deleting: true, item });
  };

  deleteCancelHandler = () => {
    this.setState({ deleting: false, item: null });
  };

  deleteContinueHandler = () => {
    this.props
      .onRemoveItemFromCart(this.props.token, this.state.item.id)
      .then(() => {
        this.setState({ deleting: false, item: null });
      });
  };

  render() {
    let cart = <Spinner />;
    if (!this.props.loading && this.props.cart) {
      cart = (
        <div>
          {this.props.cart.items.length !== 0 ? (
            this.props.cart.items.map((item, index) => (
              <CartItem
                key={index}
                mainImage={item.product.main_image.url}
                name={item.product.name}
                description={item.product.description}
                price={Math.trunc(item.product.price)
                  .toString()
                  .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}
                quantity={item.quantity}
                cartId={item.id}
                onRemove={() => this.onRemoveItem(item)}
              />
            ))
          ) : (
            <div className={classes.EmptyCart}>
              <div>Oops!</div>
              <p>Your Shopping Cart is Empty</p>
              <Button btnType="Primary" onClick={this.onBrowseProducts}>
                Browse Products
              </Button>
            </div>
          )}
        </div>
      );
    }

    let deleteSummary = null;
    if (this.state.deleting) {
      deleteSummary = (
        <DeleteSummary
          cancelHandler={this.deleteCancelHandler}
          continueHandler={this.deleteContinueHandler}
          show={this.state.deleting}
        >
          {this.props.loading ? (
            <Spinner />
          ) : (
            <p>
              Are you sure about this? This action will remove this item from
              your shopping cart.
            </p>
          )}
        </DeleteSummary>
      );
    }
    return (
      <div className={classes.Cart}>
        {deleteSummary}
        {cart}
      </div>
    );
  }
}

Cart.propTypes = {
  onFetchCart: PropTypes.func,
  token: PropTypes.string,
  loading: PropTypes.bool,
  cart: PropTypes.object,
  history: PropTypes.object,
  onRemoveItemFromCart: PropTypes.func
};

const mapStateToProps = state => ({
  loading: state.cart.loading,
  token: state.auth.token,
  cart: state.cart.cart
});

const mapDispatchToProps = dispatch => ({
  onFetchCart: token => dispatch(actions.fetchCart(token)),
  onRemoveItemFromCart: (token, cartId) =>
    dispatch(actions.removeItemFromCart(token, cartId))
});

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
