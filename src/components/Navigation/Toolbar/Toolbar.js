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
        <NavigationItems isAuthenticated={props.isAuthenticated} />
      </nav>
      <div className={classes.Clearfix}></div>
    </header>
  );
};

Toolbar.propTypes = {
  toggleMenu: PropTypes.func,
  showMenu: PropTypes.bool,
  isAuthenticated: PropTypes.bool
};

export default Toolbar;
