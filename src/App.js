import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import axios from 'axios';
import dotenv from 'dotenv';
import Layout from './hoc/Layout/Layout';
import NotFound from './components/pages/NotFound/NotFound';
import Home from './containers/Pages/Home/Home';
import Products from './containers/Pages/Products/Products';
import Signup from './containers/Auth/Signup/Signup';
import Login from './containers/Auth/Login/Login';
import ActivateUser from './containers/Auth/ActivateUser/ActivateUser';
import Logout from './containers/Auth/Logout/Logout';
import Dashboard from './containers/Admin/Dashboard/Dashboard';
import Brand from './containers/Admin/Resources/Brand/Index/Index';
import Category from './containers/Admin/Resources/Category/Index/Index';
import Product from './containers/Admin/Resources/Product/Index/Index';
import CreateBrand from './containers/Admin/Resources/Brand/Create/Create';
import CreateCategory from './containers/Admin/Resources/Category/Create/Create';
import CreateProduct from './containers/Admin/Resources/Product/Create/Create';
import EditBrand from './containers/Admin/Resources/Brand/Edit/Edit';
import EditProduct from './containers/Admin/Resources/Product/Edit/Edit';
import EditCategory from './containers/Admin/Resources/Category/Edit/Edit';
import AdminViewProduct from './containers/Admin/Resources/Product/View/View';
import ViewProduct from './containers/Pages/Products/Product/Product';
import ViewCart from './containers/Cart/Cart';
import ForgotPassword from './containers/Auth/ForgotPassword/ForgotPassword';
import ResetPassword from './containers/Auth/ForgotPassword/ResetPassword/ResetPassword';

dotenv.config();

const REACT_APP_BACKEND_URL = 'http://localhost:5000/api/v1';
axios.defaults.baseURL = REACT_APP_BACKEND_URL;

export class App extends Component {
  render() {
    let routes = (
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/products" component={Products} />
        <Route path="/products/:productId" component={ViewProduct} />
        <Route path="/register" component={Signup} />
        <Route path="/activate-user/:token" component={ActivateUser} />
        <Route path="/login" component={Login} />
        <Route path="/forgot-password" component={ForgotPassword} />
        <Route path="/reset-password/:token" component={ResetPassword} />
        <Route path="*" component={NotFound} />
      </Switch>
    );

    if (this.props.isAuthenticated && !this.props.isAdmin) {
      routes = (
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/products" component={Products} />
          <Route path="/products/:productId" component={ViewProduct} />
          <Route path="/register" component={Signup} />
          <Route path="/login" component={Login} />
          <Route path="/logout" component={Logout} />
          <Route exact path="/cart" component={ViewCart} />
          <Route path="*" component={NotFound} />
        </Switch>
      );
    }

    if (this.props.isAuthenticated && this.props.isAdmin) {
      routes = (
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/products" component={Products} />
          <Route path="/products/:productId" component={ViewProduct} />
          <Route path="/register" component={Signup} />
          <Route path="/login" component={Login} />
          <Route path="/logout" component={Logout} />
          <Route exact path="/cart" component={ViewCart} />
          <Route path="/admin/dashboard" component={Dashboard} />

          <Route exact path="/admin/brands" component={Brand} />
          <Route path="/admin/brands/create" component={CreateBrand} />
          <Route path="/admin/brands/:brandId/edit" component={EditBrand} />

          <Route exact path="/admin/categories" component={Category} />
          <Route path="/admin/categories/create" component={CreateCategory} />
          <Route
            path="/admin/categories/:categoryId/edit"
            component={EditCategory}
          />

          <Route exact path="/admin/products" component={Product} />
          <Route
            exact
            path="/admin/products/create"
            component={CreateProduct}
          />
          <Route
            exact
            path="/admin/products/:productId"
            component={AdminViewProduct}
          />
          <Route
            exact
            path="/admin/products/:productId/edit"
            component={EditProduct}
          />
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
