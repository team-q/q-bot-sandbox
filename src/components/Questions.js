import React from 'react';
import { connectFirestore } from './connectFirestore';
import { channelCollection } from '../services/firebase';

 export default function Questions({ channel, handleClick }) {
  const questionListItems = channel && channel.map(c => {
    const question = c.question.split('> ')[1];
    return (
      <li key={c.id}>
        <p>{c.name}</p>
        <p>{question}</p>
        <p>TA: {c.TA}</p>
        <button onClick={handleClick.bind(null, c.id)}>Add TA</button>
      </li>
    )
  })

   return (
     <>
     {channel === null && <h1>Loading...</h1>}
     {channel && 
     <ul>
      {questionListItems}
    </ul>
    }
    </>
  )
}

 export const ConnectQuestions = connectFirestore(
  channelCollection, 'channel'
)(Questions)
