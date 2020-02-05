import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import axios from 'axios';
import dotenv from 'dotenv';
import AsyncComponent from './hoc/AsyncComponent/AsyncComponent';
import Layout from './hoc/Layout/Layout';

dotenv.config();

const REACT_APP_BACKEND_URL = 'http://localhost:5000/api/v1';
axios.defaults.baseURL = REACT_APP_BACKEND_URL;

const NotFound = AsyncComponent(() => {
  return import('./components/pages/NotFound/NotFound');
});

const Home = AsyncComponent(() => {
  return import('./containers/Pages/Home/Home');
});

const Products = AsyncComponent(() => {
  return import('./containers/Pages/Products/Products');
});

const Signup = AsyncComponent(() => {
  return import('./containers/Auth/Signup/Signup');
});

const Login = AsyncComponent(() => {
  return import('./containers/Auth/Login/Login');
});

const ActivateUser = AsyncComponent(() => {
  return import('./containers/Auth/ActivateUser/ActivateUser');
});

const Logout = AsyncComponent(() => {
  return import('./containers/Auth/Logout/Logout');
});

const Dashboard = AsyncComponent(() => {
  return import('./containers/Admin/Dashboard/Dashboard');
});

const Brand = AsyncComponent(() => {
  return import('./containers/Admin/Resources/Brand/Index/Index');
});

const Category = AsyncComponent(() => {
  return import('./containers/Admin/Resources/Category/Index/Index');
});

const Product = AsyncComponent(() => {
  return import('./containers/Admin/Resources/Product/Index/Index');
});

const CreateBrand = AsyncComponent(() => {
  return import('./containers/Admin/Resources/Brand/Create/Create');
});

const CreateCategory = AsyncComponent(() => {
  return import('./containers/Admin/Resources/Category/Create/Create');
});

const CreateProduct = AsyncComponent(() => {
  return import('./containers/Admin/Resources/Product/Create/Create');
});

const EditBrand = AsyncComponent(() => {
  return import('./containers/Admin/Resources/Brand/Edit/Edit');
});

const EditCategory = AsyncComponent(() => {
  return import('./containers/Admin/Resources/Category/Edit/Edit');
});

const EditProduct = AsyncComponent(() => {
  return import('./containers/Admin/Resources/Product/Edit/Edit');
});

const AdminViewProduct = AsyncComponent(() => {
  return import('./containers/Admin/Resources/Product/View/View');
});

const ViewProduct = AsyncComponent(() => {
  return import('./containers/Pages/Products/Product/Product');
});

const ViewCart = AsyncComponent(() => {
  return import('./containers/Cart/Cart');
});

const ForgotPassword = AsyncComponent(() => {
  return import('./containers/Auth/ForgotPassword/ForgotPassword');
});

const ResetPassword = AsyncComponent(() => {
  return import('./containers/Auth/ForgotPassword/ResetPassword/ResetPassword');
});
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
