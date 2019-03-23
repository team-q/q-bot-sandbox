import React from 'react';
import { ConnectQuestions } from './Questions';
import QuestionForm from './QuestionForm';

export default function QuestionDatabase() {
    return (
      <>
        <QuestionForm />
        <ConnectQuestions />
      </>
    )
}