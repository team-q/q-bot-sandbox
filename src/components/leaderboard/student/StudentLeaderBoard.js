import React from 'react';
import { studentsCollection } from '../../../services/firebase';
import { useFirestore } from '../../connectFirestore';

import './StudentLeaderBoard.scss';

export default function StudentLeaderBoard() {
<<<<<<< HEAD
  const students = useFirestore(studentsCollection, []);
  students.sort((a, b) => {
    return b.count - a.count;
  });
=======
  const questions = useFirestore(solvedCollection, []);
>>>>>>> 2b0f96ac61b0e05aff03eba0423835b1bf9ab464

  console.log(students)

  return (
    <>
<<<<<<< HEAD
      <h1 className={'center-align'}>Student Leader Board</h1>
      <table className={'leaderTable studentTable'}>
        <thead>
          <tr className={'tableRow'}>
            <th className={'tableHeader'}>Student</th>
            <th className={'tableHeader'}>Count</th>
=======
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
>>>>>>> 2b0f96ac61b0e05aff03eba0423835b1bf9ab464
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
