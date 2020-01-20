import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classes from './Content.module.css';

class Content extends Component {
  render() {
    return <div className={classes.Content}>{this.props.children}</div>;
  }
}

Content.propTypes = {
  children: PropTypes.node.isRequired
};

export default Content;
