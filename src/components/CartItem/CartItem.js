import React from 'react';
import PropTypes from 'prop-types';
import classes from './CartItem.module.css';
import Button from '../UI/Button/Button';

const CartItem = props => {
  return (
    <div className={classes.CartItem}>
      <img src={props.mainImage} alt="" />
      <div className={classes.ProductDetails}>
        <h3>{props.name}</h3>
        <p>{props.description}</p>
        <p>
          <strong>Product Price: </strong>
          Rwf {props.price}
        </p>
        <p>
          <strong>Quantity: </strong>
          {props.quantity}
        </p>
      </div>
      <div className={classes.Actions}>
        <Button btnType="Primary">
          <i className="fas fa-credit-card"></i> Buy Now
        </Button>
        <Button btnType="Warning" onClick={props.onRemove}>
          <i className="fas fa-minus-circle"></i> Remove
        </Button>
      </div>
    </div>
  );
};

CartItem.propTypes = {
  mainImage: PropTypes.string,
  name: PropTypes.string,
  description: PropTypes.string,
  price: PropTypes.string,
  quantity: PropTypes.number,
  onRemove: PropTypes.func
};

export default CartItem;
