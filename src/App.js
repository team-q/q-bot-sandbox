import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Login from './components/Login';
import LeaderBoard from './components/LeaderBoard';
import Questions from './components/Questions';
import Header from './components/Header';
import {withAuth} from './components/withAuth';

class App extends Component {
  render() {
    return (
      <>
        <Header />
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
