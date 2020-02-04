/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import classes from './Product.module.css';

const Product = props => {
  return (
    <div className={classes.Product}>
      <img src={props.mainImage} alt="Product" />
      <div className={classes.ProductDetails}>
        <span className={classes.ProductCategory}>{props.category}</span>
        <h4>{props.name}</h4>
        <p>{props.description}</p>
        <div className={classes.ProductBottomDetails}>
          <div className={classes.ProductPrice}>
            <span>Price </span>
            <span>Rwf {props.price}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

Product.propTypes = {
  mainImage: PropTypes.string,
  category: PropTypes.array,
  name: PropTypes.string,
  description: PropTypes.string,
  price: PropTypes.string
};

export default Product;
