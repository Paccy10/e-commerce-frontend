import React from 'react';
import PropTypes from 'prop-types';
import Aux from '../../hoc/Aux/Aux';
import Button from '../UI/Button/Button';
import classes from './DeleteSummary.module.css';

const DeleteSummary = props => {
  return (
    <Aux>
      <div className={classes.Message}>{props.children}</div>
      <div className={classes.Buttons}>
        <Button btnType="Danger" onClick={props.cancelHandler}>
          Cancel
        </Button>
        <Button btnType="Primary" onClick={props.continueHandler}>
          Continue
        </Button>
      </div>
    </Aux>
  );
};

DeleteSummary.propTypes = {
  children: PropTypes.node.isRequired,
  cancelHandler: PropTypes.func.isRequired,
  continueHandler: PropTypes.func.isRequired
};

export default DeleteSummary;
