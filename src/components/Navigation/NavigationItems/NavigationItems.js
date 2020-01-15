import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import NavigationItem from './NavigationItem/NavigationItem';
import classes from './NavigationItems.module.css';
import Aux from '../../../hoc/Aux/Aux';
import avatar from '../../../assets/img/avatar.svg';

const NavigationItems = props => {
  return (
    <ul className={classes.NavigationItems}>
      <NavigationItem link="/" exact>
        Home
      </NavigationItem>
      <NavigationItem link="/products">Products</NavigationItem>
      <NavigationItem link="/categories">Categories</NavigationItem>
      <NavigationItem link="/brands">Brands</NavigationItem>
      {!props.isAuthenticated ? (
        <Aux>
          <NavigationItem link="/login">Login</NavigationItem>
          <NavigationItem link="/register">Signup</NavigationItem>
        </Aux>
      ) : (
        <li className={classes.Avatar}>
          <Link to="/#!">
            <img src={avatar} alt="User" />
          </Link>
          <div className={classes.Submenu}>
            <div className={classes.Username}>Paccy</div>
            <ul>
              <li>
                <Link to="#!">
                  <i className="fas fa-key"></i>Change Password
                </Link>
              </li>
              <li>
                <Link to="/logout">
                  <i className="fas fa-sign-out-alt"></i>Logout
                </Link>
              </li>
            </ul>
          </div>
        </li>
      )}
    </ul>
  );
};

NavigationItems.propTypes = {
  isAuthenticated: PropTypes.bool
};

export default NavigationItems;
