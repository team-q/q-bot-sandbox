import React, { Component } from 'react';
// import QuestionForm from './components/QuestionForm';
import Login from './components/Login';
// import { addQuestion } from './actions/questions';
// import { ConnectQuestions } from './components/Questions';
// import { subscribe } from './services/firebase';

class App extends Component {

  // componentDidMount() {
  //   subscribe(user => {
  //     console.log(user)
  //   })
  // }

  // handleSubmit = (name, question, event) => {
  //   event.preventDefault();
  //   addQuestion({ name, question })
  // }

  render() {
    return (
        <>
          <Login />
          {/* <QuestionForm handleSubmit={this.handleSubmit} />
          <ConnectQuestions/> */}
        </>
    );
  }
}

export default App;
