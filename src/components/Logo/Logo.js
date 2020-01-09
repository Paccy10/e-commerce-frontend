import React from 'react';
import { Link } from 'react-router-dom';
import classes from './Logo.module.css';

const Logo = () => {
  return (
    <div className={classes.Logo}>
      <Link to="/">
        Arrows
        <i className="fa fa-shopping-cart"></i>
      </Link>
    </div>
  );
};

export default Logo;
