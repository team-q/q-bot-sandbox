import React from 'react';
import { studentsCollection } from '../../../services/firebase';
import { useFirestore } from '../../connectFirestore';

import './StudentLeaderBoard.scss';

export default function StudentLeaderBoard() {
  const students = useFirestore(studentsCollection, []);
  students.sort((a, b) => {
    return b.count - a.count;
  });

  console.log(students)

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
          {students.map(student => (
            <tr className={'tableRow'}>
              <td className={'tableData'}>{student.name}</td>
              <td className={'tableData center-align'}>{student.count}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}
