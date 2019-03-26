import React from 'react';
import { connectFirestore } from './connectFirestore';
import { channelCollection } from '../services/firebase';
import './Questions.css';

 export default function Questions({ channel }) {
  const questionTableItems = channel && channel.map(c => {
    const question = c.question.split('> ')[1];
    return (
      
      <tr key={c.messageId} className={'tableRow'}>
        <td className={'tableData'}>{c.name}</td>
        <td className={'tableData'}>{question}</td>
      </tr>
    )
  })

   return (
    <table className={'qBotTable'}>
      <thead>
        <tr>
          <th className={'tableHeader'}>
            Name
          </th>
          <th className={'tableHeader'}>
            Question
          </th>
        </tr>
      </thead>
      <tbody>
        {questionTableItems}
      </tbody>
    </table>
    
  )
}

 export const ConnectQuestions = connectFirestore(
  channelCollection, 'channel'
)(Questions)
