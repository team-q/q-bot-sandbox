import React, { useState } from 'react';
import { useFirestore } from '../connectFirestore';
import { questionCollection } from '../../services/firebase';
import Header from '../layout/Header';
import './Questions.scss';
import Question from './Question';
import { addClaim } from '../../actions/questions';

 export default function QuestionsList({ filterValue, sortValue, cohortSortValue, providerData }) {
   const [taName] = useState(providerData[0].displayName);

   const question = useFirestore(questionCollection.orderBy('timestamp', sortValue), [], sortValue, cohortSortValue)
   .filter(c => {
      return (c.question.includes(filterValue.toLowerCase()) || c.question.includes(filterValue.toUpperCase())) && c.channelName.includes(cohortSortValue)
   })
   
   const questionTableItems = question && question.map(doc => {
    return (
      <Question 
        questionObj={doc} 
        key={doc.id} 
        providerData={providerData}
        handleClick={(id) => addClaim(taName, id)}
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
    <Header />
    {question === null && <h1>Loading...</h1>}
    { question && 
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
