import React, { Component } from 'react';
import { 
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';
import Login from './components/Login';
import LeaderBoard from './components/LeaderBoard';
import Questions from './components/Questions';
import {withAuth} from './components/withAuth';

class App extends Component {
  render() {
    return (
      <>
        <Router>
          <Switch>
            <Route exact path='/' component={Login} />
            <Route exact path='/questions' component={withAuth(Questions)} />
            <Route exact path='/leaderboard' component={withAuth(LeaderBoard)} />
            <Redirect to='/questions'/>
          </Switch>
        </Router>
      </>
    );
  }
}

export default App;
