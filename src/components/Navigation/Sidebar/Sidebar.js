import React from 'react';
import classes from './Sidebar.module.css';
import NavigationItem from '../NavigationItems/NavigationItem/NavigationItem';

const Sidebar = () => {
  return (
    <div className={classes.Sidebar}>
      <ul>
        <NavigationItem link="/admin/dashboard">
          <i className="fas fa-home" style={{ marginRight: '10px' }}></i>
          Dashboard
        </NavigationItem>
        <NavigationItem link="/admin/brands">
          <i className="fas fa-tags" style={{ marginRight: '10px' }}></i>
          Brands
        </NavigationItem>
        <NavigationItem link="/admin/categories">
          <i className="fas fa-dumpster" style={{ marginRight: '10px' }}></i>
          Categories
        </NavigationItem>
        <NavigationItem link="/admin/products">
          <i
            className="fas fa-shopping-basket"
            style={{ marginRight: '10px' }}
          ></i>
          Products
        </NavigationItem>
      </ul>
    </div>
  );
};

export default Sidebar;
