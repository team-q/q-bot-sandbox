import React from 'react';
import { connectFirestore } from './connectFirestore';
import { channelCollection } from '../services/firebase';

 export default function Questions({ channel, providerData, handleClick }) {
  const questionListItems = channel && channel.map(c => {
    const question = c.question.split('> ')[1];
    return (
      <li key={c.id}>
        <p>{c.name}</p>
        <p>{question}</p>
        <button onClick={handleClick.bind(null, c.id)}>Add TA</button>
      </li>
    )
  })

  console.log(providerData[0].displayName);
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
