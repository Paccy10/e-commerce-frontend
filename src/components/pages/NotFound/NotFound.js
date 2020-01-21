/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import Button from '../../UI/Button/Button';
import classes from './NotFound.module.css';

const NotFound = props => {
  const goToHomepage = () => {
    props.history.push('/');
  };
  return (
    <div className={classes.NotFound}>
      <div>Oops!</div>
      <p>404 - PAGE NOT FOUND</p>
      <p>
        The page you are looking for might have been removed, had its name
        changed is temporarily unavailable or you don&apos;t have permission to
        access it.
      </p>
      <Button btnType="Primary" onClick={goToHomepage}>
        GO TO HOMEPAGE
      </Button>
    </div>
  );
};

NotFound.propTypes = {
  history: PropTypes.object
};

export default NotFound;
