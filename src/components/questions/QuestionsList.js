import React from 'react';
import './Questions.scss';
import Question from './Question';
import { addClaim } from '../../actions/questions';

export default function QuestionsList({ questions, providerData }) {
  const taName = providerData[0].displayName;

  const questionTableItems = questions && questions.map(doc => {
    return (
      <Question
        questionObj={doc}
        key={doc.id}
        providerData={providerData}
        handleClick={addClaim.bind(null, taName, doc.id)}
      />
    )
  })

  const headers = ['Name', 'Question', 'Timestamp', 'TA', 'Solved'];
  const headersList = headers.map((header, i) => {
    return (
      <th className={'tableHeader'} key={i}>
        {header}
      </th>
    )
  })

  return (
    <>
      {questions === null && <h1>Loading...</h1>}
      {questions &&
        <>
          <h1>TA Queue</h1>
          <table className={'qBotTable'}>
            <thead>
              <tr>
                {headersList}
              </tr>
            </thead>
            <tbody>
              {questionTableItems}
            </tbody>
          </table>
        </>
      }
    </>
  )
}
