import React from 'react';
import { solvedCollection } from '../../../services/firebase';
import { useFirestore } from '../../connectFirestore';

import './StudentLeaderBoard.scss';

export default function StudentLeaderBoard() {
  const questions = useFirestore(solvedCollection, []);

  const counts = questions
    .reduce((acc, question) => {
      const personCount = acc[question.name] || 0;
      return { ...acc, [question.name]: personCount + 1 }
    }, {})

  const sorted = Object.keys(counts)
    .map(name => ([name, counts[name]]))
    .sort((a, b) => {
      return b[1] - a[1];
    })
  return (
    <>
    <h1 className={'center-align'}>Student Leader Board</h1>
    <table className={'leaderTable studentTable'}>
      <thead>
        <tr className={'tableRow'}>
          <th className={'tableHeader'}>Student</th>
          <th className={'tableHeader'}>Count</th>
        </tr>
      </thead>
      <tbody>
        {sorted.map((student, idx) => (
          <tr className={'tableRow'} key={idx}>
            <td className={'tableData'}>{student[0]}</td>
            <td className={'tableData center-align'}>{student[1]}</td>
          </tr>
        ))}
      </tbody>
    </table>
    </>
  )
}
