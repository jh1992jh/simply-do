import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import store from './store';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utilities/setAuthToken';
import { setCurrentUser, logoutUser } from './actions/authActions';
import Mainview from './components/Mainview';
import Login from './components/Login';
import PrivateRoute from './components/PrivateRoute';
import './App.css';
import Navbar from './components/navbars/Navbar';
import Statistics from './components/Statistics';

if (localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken);

  const decoded = jwt_decode(localStorage.jwtToken);

  store.dispatch(setCurrentUser(decoded));
  const checkTime = Date.now() / 1000;
  if (decoded.exp < checkTime) {
    store.dispatch(logoutUser());
    window.location.href = './';
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div>
            <Navbar />
            <Route exact path="/" component={Login} />
            <Switch>
              <PrivateRoute exact path="/dashboard" component={Mainview} />
            </Switch>
            <Switch>
            <PrivateRoute exact path="/statistics" component={Statistics} />
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
