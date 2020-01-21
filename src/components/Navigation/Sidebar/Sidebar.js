import React from 'react';
import classes from './Sidebar.module.css';
import NavigationItem from '../NavigationItems/NavigationItem/NavigationItem';

const Sidebar = () => {
  return (
    <div className={classes.Sidebar}>
      <ul>
        <NavigationItem link="/admin/dashboard">Dashboard</NavigationItem>
        <NavigationItem link="/admin/brands">Brands</NavigationItem>
        <NavigationItem link="/admin/categories">Categories</NavigationItem>
        <NavigationItem link="/admin/products">Products</NavigationItem>
        <NavigationItem link="/admin/users">Users</NavigationItem>
      </ul>
    </div>
  );
};

export default Sidebar;
