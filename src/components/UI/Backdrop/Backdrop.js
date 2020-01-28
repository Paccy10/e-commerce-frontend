import React from 'react';
import PropTypes from 'prop-types';
import classes from './Backdrop.module.css';

const Backdrop = props =>
  props.show ? <div className={classes.Backdrop}></div> : null;

Backdrop.propTypes = {
  show: PropTypes.bool
};

export default Backdrop;
