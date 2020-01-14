import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Aux from '../Aux/Aux';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import Footer from '../../components/Footer/Footer';
import Alert from '../../containers/Alert/Alert';
import classes from './Layout.module.css';

class Layout extends Component {
  state = {
    showMenu: false
  };

  onToggleMenu = () => {
    this.setState({ showMenu: !this.state.showMenu });
  };

  render() {
    return (
      <Aux>
        <Alert />
        <div className={classes.Wrapper}>
          <Toolbar
            toggleMenu={this.onToggleMenu}
            showMenu={this.state.showMenu}
          />
          <main>{this.props.children}</main>
          <div className={classes.Push}></div>
        </div>
        <Footer />
      </Aux>
    );
  }
}

Layout.propTypes = {
  children: PropTypes.node.isRequired
};

export default Layout;
