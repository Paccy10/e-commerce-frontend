import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Sidebar from '../../../components/Navigation/Sidebar/Sidebar';
import Content from './Content/Content';
import classes from './Layout.module.css';

class Layout extends Component {
  render() {
    return (
      <div className={classes.Layout}>
        <Sidebar />
        <Content>{this.props.children}</Content>
      </div>
    );
  }
}

Layout.propTypes = {
  children: PropTypes.node.isRequired
};

export default Layout;
