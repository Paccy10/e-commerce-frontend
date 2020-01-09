import React from 'react';
import NavigationItem from './NavigationItem/NavigationItem';
import classes from './NavigationItems.module.css';

const NavigationItems = () => {
  return (
    <ul className={classes.NavigationItems}>
      <NavigationItem link="/" exact>
        Home
      </NavigationItem>
      <NavigationItem link="/products">Products</NavigationItem>
      <NavigationItem link="/categories">Categories</NavigationItem>
      <NavigationItem link="/login">Login</NavigationItem>
      <NavigationItem link="/register">Signup</NavigationItem>
    </ul>
  );
};

export default NavigationItems;
