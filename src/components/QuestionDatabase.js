import React, { PureComponent } from 'react';
import { ConnectQuestions } from './Questions';
import QuestionForm from './QuestionForm';

export default class QuestionDatabase extends PureComponent {
 
  
  render() {
    return (
      <>
        <QuestionForm handleSubmit={this.handleSubmit}/>
        <ConnectQuestions />
      </>
    )
  }
}