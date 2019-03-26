import React from 'react';
import { connectFirestore } from './connectFirestore';
import { channelCollection } from '../services/firebase';
import './Questions.css';

 export default function Questions({ channel, handleClick }) {
  const questionTableItems = channel && channel.map(c => {
    const question = c.question.split('> ')[1];
    return (
      <tr key={c.id} className={'tableRow'}>
        <td className={'tableData'}>{c.name}</td>
        <td className={'tableData'}>{question}</td>
        <td className={'tableData'}>
          {c.TA}
          <button onClick={handleClick.bind(null, c.id)} className={'taButton' + (c.TA !== undefined ? 'Active' : '')}></button>
        </td>
      </tr>
    )
  })

   return (
    <>
    {channel === null && <h1>Loading...</h1>}
    { channel && 
    <table className={'qBotTable'}>
      <thead>
        <tr>
          <th className={'tableHeader'}>
            Name
          </th>
          <th className={'tableHeader'}>
            Question
          </th>
          <th className={'tableHeader'}>
            TA
          </th>
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
