import React, { Component } from 'react';
// import routes from './routes.js';
import style from './Main.css'
import { Button } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.css';

import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from 'react-router-dom'

import HomePageContainer from './containers/HomePageContainer.jsx';
import LoginPage from './containers/LoginPage.jsx';
import LogoutFunction from './containers/LogoutFunction.jsx';
import SignUpPage from './containers/SignUpPage.jsx';
import DashboardPage from './containers/DashboardPage.jsx';
import Auth from './modules/Auth';

// remove tap delay, essential for MaterialUI to work properly

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    Auth.isUserAuthenticated() ? (
        <Component {...props}/>
    ) : (
      <Redirect to={{
        pathname: '/',
        state: { from: props.location }
      }}/>
    )
  )}/>
)

const LoggedOutRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    Auth.isUserAuthenticated() ? (
      <Redirect to={{
        pathname: '/',
        state: { from: props.location }
      }}/>
    ) : (
      <Component {...props} {...rest} />
    )
  )}/>
)

const PropsRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    <Component {...props} {...rest} />
  )}/>
)

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authenticated: false
    }
  };

  componentDidMount() {
    // check if user is logged in on refresh
    this.toggleAuthenticateStatus()
  }

  toggleAuthenticateStatus() {
    // check authenticated status and toggle state based on that
    this.setState({ authenticated: Auth.isUserAuthenticated() })
  }

  render() {
    return (
        <Router>
          <div>
            <div className="top-bar eden">
              <div className="top-bar-left">
                <Link to="/">jaekwxn</Link>
              </div>
              {this.state.authenticated ? (
                <div className="top-bar-right">
                  <Link to="/dashboard">
                    <Button className ="roundedbut" outline color="primary">Dashboard</Button>
                  </Link>
                  <Link to="/logout">
                    <Button className ="roundedbut" outline color="primary">Log Out</Button>
                  </Link>
                </div>
              ) : (
                <div className="top-bar-right">
                  <Link to="/login">
                    <Button className ="roundedbut" outline color="primary">Login</Button>
                  </Link>
                  <Link to="/signup">
                    <Button className ="roundedbut" outline color="primary">Sign Up</Button>
                  </Link>
                </div>
              )}
            </div>

            <PropsRoute exact path="/" component={HomePageContainer} toggleAuthenticateStatus={() => this.toggleAuthenticateStatus()} />
            <PrivateRoute path="/dashboard" component={DashboardPage}/>
            <LoggedOutRoute path="/login" component={LoginPage} toggleAuthenticateStatus={() => this.toggleAuthenticateStatus()} />
            <LoggedOutRoute path="/signup" component={SignUpPage}/>
            <Route path="/logout" component={LogoutFunction}/>
          </div>

        </Router>
    );
  }
}

export default Main;
