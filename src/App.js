import React, { Component } from 'react';
import QuestionForm from './components/QuestionForm';
import Login from './components/Login';
import { addQuestion } from './actions/questions';
import { ConnectQuestions } from './components/Questions';
import { subscribe } from './services/firebase';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';

class App extends Component {

  componentDidMount() {
    subscribe(user => {
      console.log(user)
    })
  }

  // handleSubmit = (name, question, event) => {
  //   event.preventDefault();
  //   addQuestion({ name, question })
  // }

  render() {
    return (
        <Router>
          <Switch>
            <Route path='/' component={Login}></Route>
            <Route path='/questions' component={ConnectQuestions} />
          </Switch>
          
          {/* <QuestionForm handleSubmit={this.handleSubmit} />
          <ConnectQuestions/> */}
        </Router>
    );
  }
}

export default App;
