import React from 'react';
import { solvedCollection } from '../../../services/firebase';
import { useFirestore } from '../../connectFirestore';

export default function StudentLeaderBoard() {
  const questions = useFirestore(solvedCollection, []);
  console.log(questions)

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
    <table>
      <thead>
        <tr>
          <th>Student</th>
          <th>Count</th>
        </tr>
      </thead>
      <tbody>
        {sorted.map(student => (
          <tr>
            <td>{student[0]}</td>
            <td>{student[1]}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
