import React, { Component } from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import Layout from './hoc/Layout/Layout';
import Home from './containers/Home/Home';
import Signup from './containers/Auth/Signup/Signup';
import Login from './containers/Auth/Login/Login';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Layout>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/register" exact component={Signup} />
            <Route path="/login" exact component={Login} />
          </Switch>
        </Layout>
      </BrowserRouter>
    );
  }
}

export default App;
