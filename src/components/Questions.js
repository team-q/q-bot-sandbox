import React from 'react';
import { connectFirestore } from './connectFirestore';
import { channelCollection } from '../services/firebase';

 export default function Questions({ channel }) {
  const questionListItems = channel && channel.map(c => {
    const question = c.question.split('> ')[1];
    return (
      <li key={c.id}>
        <p>{c.name}</p>
        <p>{question}</p>
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
