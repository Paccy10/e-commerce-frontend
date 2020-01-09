import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Aux from '../Aux/Aux';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import Footer from '../../components/Footer/Footer';

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
        <Toolbar
          toggleMenu={this.onToggleMenu}
          showMenu={this.state.showMenu}
        />
        <main>{this.props.children}</main>
        <Footer />
      </Aux>
    );
  }
}

Layout.propTypes = {
  children: PropTypes.node.isRequired
};

export default Layout;
