import React from 'react';
import { connectFirestore } from './connectFirestore';
import { channelCollection } from '../services/firebase';

 export default function Questions({ channel }) {
  const questionListItems = channel && channel.map(c => {
    console.log('hello', c);
    return (
      <li key={c.id}>
        <p>{c.id}</p>
        <p>{c.name}</p>
        <p>{c.question}</p>
      </li>
    )
  })

   return (
    <ul>
      {questionListItems}
    </ul>
  )
}

 export const ConnectQuestions = connectFirestore(
  channelCollection, 'channel'
)(Questions)
