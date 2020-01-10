import React from 'react';
import PropTypes from 'prop-types';
import classes from './Button.module.css';

const Button = props => (
  <button
    type="button"
    disabled={props.disabled}
    className={[classes.Button, classes[props.btnType]].join(' ')}
    onClick={props.clicked}
  >
    {props.children}
  </button>
);

Button.propTypes = {
  disabled: PropTypes.bool,
  btnType: PropTypes.string.isRequired,
  clicked: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired
};

export default Button;
