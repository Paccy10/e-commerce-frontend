import React from 'react';
import PropTypes from 'prop-types';
import Button from '../UI/Button/Button';
import Modal from '../UI/Modal/Modal';
import classes from './DeleteSummary.module.css';

const DeleteSummary = props => {
  return (
    <Modal show={props.show}>
      <div className={classes.Title}>Delete Asset</div>
      <div className={classes.Message}>{props.children}</div>
      <div className={classes.Buttons}>
        <Button btnType="Danger" onClick={props.cancelHandler}>
          Cancel
        </Button>
        <Button btnType="Danger" onClick={props.continueHandler}>
          Continue
        </Button>
      </div>
    </Modal>
  );
};

DeleteSummary.propTypes = {
  children: PropTypes.node.isRequired,
  cancelHandler: PropTypes.func.isRequired,
  continueHandler: PropTypes.func.isRequired,
  show: PropTypes.bool
};

export default DeleteSummary;
