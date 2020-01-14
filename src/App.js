import React, { Component } from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import axios from 'axios';
import Layout from './hoc/Layout/Layout';
import Home from './containers/Home/Home';
import Signup from './containers/Auth/Signup/Signup';
import Login from './containers/Auth/Login/Login';
import ActivateUser from './containers/Auth/ActivateUser/ActivateUser';
import store from './store';

const REACT_APP_BACKEND_URL = 'http://localhost:5000/api/v1';
axios.defaults.baseURL = REACT_APP_BACKEND_URL;

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <Layout>
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/register" exact component={Signup} />
              <Route path="/login" exact component={Login} />
              <Route path="/activate-user/:token" component={ActivateUser} />
            </Switch>
          </Layout>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
