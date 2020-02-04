/* eslint-disable camelcase */
/* eslint-disable react/forbid-prop-types */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Aux from '../Aux/Aux';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import Footer from '../../components/Footer/Footer';
import Alert from '../../containers/Alert/Alert';
import classes from './Layout.module.css';
import * as actions from '../../store/actions';

export class Layout extends Component {
  state = {
    showMenu: false
  };

  async componentDidMount() {
    await this.props.onTryAutoSignup();
  }

  onToggleMenu = () => {
    this.setState({ showMenu: !this.state.showMenu });
  };

  render() {
    if (this.props.isAuthenticated && !this.props.cart) {
      this.props.onFetchCart(this.props.token);
    }
    let cartSize = 0;
    if (this.props.cart) {
      cartSize = this.props.cart.items.length;
    }
    return (
      <Aux>
        <Alert />
        <div className={classes.Wrapper}>
          <Toolbar
            toggleMenu={this.onToggleMenu}
            showMenu={this.state.showMenu}
            isAuthenticated={this.props.isAuthenticated}
            isAdmin={this.props.isAdmin}
            username={this.props.username}
            cartSize={cartSize}
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
  children: PropTypes.node.isRequired,
  isAuthenticated: PropTypes.bool,
  isAdmin: PropTypes.bool,
  onTryAutoSignup: PropTypes.func,
  username: PropTypes.string,
  onFetchCart: PropTypes.func,
  token: PropTypes.string,
  cart: PropTypes.object
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.token !== null,
  isAdmin: state.auth.user !== null ? state.auth.user.is_admin : false,
  username:
    state.auth.user !== null
      ? `${state.auth.user.firstname} ${state.auth.user.lastname}`
      : null,
  token: state.auth.token,
  cart: state.cart.cart
});

const mapDispatchToProps = dispatch => ({
  onTryAutoSignup: () => dispatch(actions.authCheckState()),
  onFetchCart: token => dispatch(actions.fetchCart(token))
});

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
