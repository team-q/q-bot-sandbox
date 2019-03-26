import React from 'react';
import { connectFirestore } from './connectFirestore';
import { channelCollection } from '../services/firebase';
import { withAuthentication } from './withAuth';

 export default function Questions({ channel, providerData, onClick }) {
  const questionListItems = channel && channel.map(c => {
    const question = c.question.split('> ')[1];
    return (
      <li key={c.id}>
        <p>{c.name}</p>
        <p>{question}</p>
        <p>TA: {c.TA}</p>
        <button onClick={onClick} value={c.id}>Claim</button>
      </li>
    )
  })

   return (
    <>
    <ul>
      {questionListItems}
    </ul>
    </>
  )
}

 export const ConnectQuestions = connectFirestore(
  channelCollection, 'channel'
)(withAuthentication(Questions))
