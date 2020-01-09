import React from 'react';
import classes from './Footer.module.css';

const Footer = () => {
  const date = new Date();
  const year = date.getFullYear();
  return (
    <footer className={classes.Footer}>
      <p>Arrows Shop, Copyright &copy; {year}</p>
    </footer>
  );
};

export default Footer;
