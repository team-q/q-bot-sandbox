import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';
import Login from '../login/Login';
import LeaderBoard from '../leaderboard/LeaderBoard';
import Questions from '../questions/Questions';
import About from '../about/About';
import { withAuth } from '../withAuth';
import StudentLeaderBoard from '../leaderboard/student/StudentLeaderBoard';

class App extends Component {
  render() {
    return (
      <>
        <Router>
          <Switch>
            <Route exact path='/' component={Login} />
            <Route exact path='/questions' component={withAuth(Questions)} />
            <Route exact path='/about' component={About} />
            <Route exact path='/student-leaderboard' component={withAuth(StudentLeaderBoard)} />
            <Route exact path='/leaderboard' component={withAuth(LeaderBoard)} />
            <Redirect to='/questions' />
          </Switch>
        </Router>
      </>
    );
  }
}

export default App;
