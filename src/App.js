import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import axios from 'axios';
import Layout from './hoc/Layout/Layout';
import Home from './containers/Home/Home';
import Signup from './containers/Auth/Signup/Signup';
import Login from './containers/Auth/Login/Login';
import ActivateUser from './containers/Auth/ActivateUser/ActivateUser';
import Logout from './containers/Auth/Logout/Logout';
import Dashboard from './containers/Admin/Dashboard/Dashboard';
import Brand from './containers/Admin/Resources/Brand/Index/Index';
import CreateBrand from './containers/Admin/Resources/Brand/Create/Create';
import EditBrand from './containers/Admin/Resources/Brand/Edit/Edit';
import NotFound from './components/pages/NotFound/NotFound';

const REACT_APP_BACKEND_URL = 'http://localhost:5000/api/v1';
axios.defaults.baseURL = REACT_APP_BACKEND_URL;

export class App extends Component {
  render() {
    let routes = (
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/register" component={Signup} />
        <Route path="/activate-user/:token" component={ActivateUser} />
        <Route path="/login" component={Login} />
        <Route path="*" component={NotFound} />
      </Switch>
    );

    if (this.props.isAuthenticated && !this.props.isAdmin) {
      routes = (
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/register" component={Signup} />
          <Route path="/activate-user/:token" component={ActivateUser} />
          <Route path="/login" component={Login} />
          <Route path="/logout" component={Logout} />
          <Route path="*" component={NotFound} />
        </Switch>
      );
    }

    if (this.props.isAuthenticated && this.props.isAdmin) {
      routes = (
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/register" component={Signup} />
          <Route path="/activate-user/:token" component={ActivateUser} />
          <Route path="/login" component={Login} />
          <Route path="/logout" component={Logout} />
          <Route path="/admin/dashboard" component={Dashboard} />
          <Route exact path="/admin/brands" component={Brand} />
          <Route path="/admin/brands/create" component={CreateBrand} />
          <Route path="/admin/brands/:brandId/edit" component={EditBrand} />
          <Route path="*" component={NotFound} />
        </Switch>
      );
    }

    return <Layout>{routes}</Layout>;
  }
}

App.propTypes = {
  isAuthenticated: PropTypes.bool,
  isAdmin: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.token !== null,
  isAdmin: state.auth.user !== null ? state.auth.user.is_admin : false
});

export default connect(mapStateToProps)(App);
