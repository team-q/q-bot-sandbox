import React from 'react';
import { connectFirestore } from './connectFirestore';
import { channelCollection } from '../services/firebase';
import './Questions.css';
import Question from './Question';

 export default function Questions({ channel, handleClick }) {
   const questionTableItems = channel && channel.map(doc => {
    return (
      <Question 
        questionObj={doc} 
        handleClick={handleClick} 
        key={doc.id} 
      />
    )
  })

  const headers = ['Name', 'Question', 'Timestamp', 'TA'];
  const headersList = headers.map((header, i) => {
    return (
      <th className={'tableHeader'} key={i}>
        {header}
      </th>
    )
  })

   return (
    <>
    {channel === null && <h1>Loading...</h1>}
    { channel && 
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
    }
  </>
  )
}

 export const ConnectQuestions = connectFirestore(
  channelCollection, 'channel'
)(Questions)
