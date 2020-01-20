import React, { Component } from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
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
import store from './store';

const REACT_APP_BACKEND_URL = 'http://localhost:5000/api/v1';
axios.defaults.baseURL = REACT_APP_BACKEND_URL;

export class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <Layout>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/register" component={Signup} />
              <Route path="/login" component={Login} />
              <Route path="/logout" component={Logout} />
              <Route path="/activate-user/:token" component={ActivateUser} />
              <Route path="/admin/dashboard" component={Dashboard} />
              <Route exact path="/admin/brands" component={Brand} />
              <Route path="/admin/brands/create" component={CreateBrand} />
              <Route path="/admin/brands/:id/edit" component={EditBrand} />
            </Switch>
          </Layout>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
