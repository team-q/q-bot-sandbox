import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Login from './components/Login';
import QuestionDatabase from './components/QuestionDatabase';
import Header from './components/Header';
import { subscribe } from './services/firebase';

class App extends Component {
  componentDidMount() {
    subscribe(user => {
      console.log(user)
    })
  }

  render() {
    return (
      <>
        <Header />
        <Router>
          <Switch>
            <Route exact path='/' component={Login}></Route>
            <Route exact path='/questions' component={QuestionDatabase} />
          </Switch>
        </Router>
      </>
    );
  }
}

export default App;
