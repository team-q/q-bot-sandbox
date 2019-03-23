import React, { PureComponent } from 'react';
import { ConnectQuestions } from './Questions';
import QuestionForm from './QuestionForm';
import { addQuestion } from '../actions/questions';

export default class QuestionDatabase extends PureComponent {
  handleSubmit = (name, question, event) => {
    event.preventDefault();
    addQuestion({ name, question })
  }
  
  render() {
    return (
      <>
        <QuestionForm handleSubmit={this.handleSubmit}/>
        <ConnectQuestions />
      </>
    )
  }
}