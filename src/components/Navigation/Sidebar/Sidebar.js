import React from 'react';
import { Link } from 'react-router-dom';
import classes from './Sidebar.module.css';

const Sidebar = () => {
  return (
    <div className={classes.Sidebar}>
      <ul>
        <li>
          <Link to="/admin/brands">Brands</Link>
        </li>
        <li>
          <Link to="/admin/categories">Categories</Link>
        </li>
        <li>
          <Link to="/admin/products">Products</Link>
        </li>
        <li>
          <Link to="/admin/users">Users</Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
