import React from 'react';
import SearchWrapper from './SearchWrapper.js';
import UserWrapper from './UserWrapper.js';


import LoginView from './LoginView.jsx';
import {Router, Route, Link, IndexRoute, browserHistory} from 'react-router';


// const 

class Main extends React.Component {

  render() {
    if (window.username) {
      return (
          <Router history={browserHistory}>
            <Route path='/' component={SearchWrapper} />
            <Route path='/user/subscriptions' component={UserWrapper} />
          </Router>
        )
    } else {
      return (
        <div>
          <LoginView />
        </div>
      );
    }
  }
}


export default Main;

