/* eslint-disable react/button-has-type */
import React from 'react';
import PropTypes from 'prop-types';
import classes from './Button.module.css';

const Button = props => (
  <button
    disabled={props.disabled}
    className={[classes.Button, classes[props.btnType]].join(' ')}
    onClick={props.onClick}
  >
    {props.children}
  </button>
);

Button.propTypes = {
  disabled: PropTypes.bool,
  btnType: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  children: PropTypes.node.isRequired
};

export default Button;
