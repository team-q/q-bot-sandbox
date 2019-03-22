import React, { Component } from 'react';
import QuestionForm from './components/QuestionForm';
import { addQuestion } from './actions/questions';
import { ConnectQuestions } from './components/Questions';

class App extends Component {

  handleSubmit = (name, question, event) => {
    event.preventDefault();
    addQuestion({ name, question })
  }

  render() {
    return (
        <>
          <QuestionForm handleSubmit={this.handleSubmit} />
          <ConnectQuestions/>
        </>
    );
  }
}

export default App;
