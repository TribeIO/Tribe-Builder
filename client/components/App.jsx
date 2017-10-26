import React, { Component } from 'react';
import { Route, Link, Redirect, Switch } from 'react-router-dom';

import Landing from './Landing.jsx';
import Dashboard from './dashboard/dashboard.jsx';
import Sidebar from './dashboard/sidebar.jsx';

import { Init, CheckLogin, GetCurrentUser, Login, Logout } from './utils/auth.jsx';
import PrivateRoute from './utils/private.jsx';

export default class App extends Component {
  constructor(props) {
    super(props);
      this.state = {
        isLoggedIn: true,
      }

      this.authLogin = () => {
        return this.state.isLoggedIn;
      }
    }

  componentDidMount() {
    // Initializes facebook sdk - required for other FB functions(login,logout,etc)
    // may need to incorporate further throughout individual app routes?
    Init();
  }

  render() {

      return (
        <div>
          <Switch>
            <PrivateRoute path='/dashboard' checkAuth={this.authLogin} component={Dashboard}/>
            <PrivateRoute exact path='/' checkAuth={this.authLogin} component={Landing} name="landing"/>
            <Redirect to='/' />
          </Switch>
        </div>
      )
  }
}
