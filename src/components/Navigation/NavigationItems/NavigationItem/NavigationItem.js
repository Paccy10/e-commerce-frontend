import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import classes from './NavigationItem.module.css';

const NavigationItem = props => {
  return (
    <li className={classes.NavigationItem}>
      <NavLink
        to={props.link}
        activeClassName={classes.active}
        exact={props.exact}
      >
        {props.children}
      </NavLink>
    </li>
  );
};

NavigationItem.propTypes = {
  link: PropTypes.string.isRequired,
  exact: PropTypes.bool,
  children: PropTypes.node.isRequired
};

export default NavigationItem;
