import React from 'react';
import classes from './Product.module.css';
import Button from '../UI/Button/Button';

const Product = () => {
  return (
    <div className={classes.Product}>
      <img
        src="https://res.cloudinary.com/dhsoe7agl/image/upload/v1574431161/samples/ecommerce/leather-bag-gray.jpg"
        alt="Denim Jeans"
      />
      <div className={classes.ProductDetails}>
        <span className={classes.ProductCategory}>Man,bag</span>
        <h4>Man leather bag</h4>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vero,
          possimus nostrum! Lorem ipsum dolor sit amet, consectetur adipisicing
          elit. Vero, possimus nostrum!
        </p>
        <div className={classes.ProductBottomDetails}>
          <div className={classes.ProductPrice}>
            Price: <span>$230.99</span>
          </div>
          <div className={classes.ProductLink}>
            <Button btnType="Primary" onClick={() => {}}>
              Add to Cart
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
