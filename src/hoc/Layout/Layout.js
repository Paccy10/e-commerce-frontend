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

  componentDidMount() {
    this.props.onTryAutoSignup();
  }

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
            isAuthenticated={this.props.isAuthenticated}
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
  onTryAutoSignup: PropTypes.func
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.token !== null
});

const mapDispatchToProps = dispatch => ({
  onTryAutoSignup: () => dispatch(actions.authCheckState())
});

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
