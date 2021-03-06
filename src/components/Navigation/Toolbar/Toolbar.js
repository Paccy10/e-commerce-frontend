import React from 'react';
import PropTypes from 'prop-types';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import classes from './Toolbar.module.css';

const Toolbar = props => {
  const toggleButtonClasses = [classes.MenuToggle];
  if (props.showMenu) {
    toggleButtonClasses.push(classes.Open);
  }
  return (
    <header className={classes.Toolbar}>
      <Logo />
      <div
        className={toggleButtonClasses.join(' ')}
        onClick={props.toggleMenu}
      ></div>
      <nav className={props.showMenu ? classes.OpenMenu : classes.CloseMenu}>
        <NavigationItems
          isAuthenticated={props.isAuthenticated}
          isAdmin={props.isAdmin}
          username={props.username}
          cartSize={props.cartSize}
        />
      </nav>
      <div className={classes.Clearfix}></div>
    </header>
  );
};

Toolbar.propTypes = {
  toggleMenu: PropTypes.func,
  showMenu: PropTypes.bool,
  isAuthenticated: PropTypes.bool,
  isAdmin: PropTypes.bool,
  username: PropTypes.string,
  cartSize: PropTypes.number
};

export default Toolbar;
