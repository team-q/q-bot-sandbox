import React from 'react';
import { connectFirestore } from './connectFirestore';
import { channelCollection } from '../services/firebase';

 export default function Questions({ channel, handleClick }) {
   const questionListItems = channel && channel.map(c => {
    const { id, name, question, TA } = c;
     const q = question.split('> ')[1];
     const newDate = new Date(1553626166.023600 * 1000);
    console.log(newDate);

    return (
      <li key={id}>
        <p>{name}</p>
        <p>{q}</p>
        <p>TA: {TA}</p>
        <button onClick={handleClick.bind(null, id)}>Add TA</button>
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
