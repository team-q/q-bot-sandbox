import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Login from './components/Login';
import LeaderBoard from './components/LeaderBoard';
import Questions from './components/Questions';
import {withAuth} from './components/withAuth';
import './App.css';

class App extends Component {
  render() {
    return (
      <>
        <Router>
          <Switch>
            <Route exact path='/' component={Login} />
            <Route exact path='/questions' component={withAuth(Questions)} />
            <Route exact path='/leaderboard' component={withAuth(LeaderBoard)} />
          </Switch>
        </Router>
      </>
    );
  }
}

export default App;
