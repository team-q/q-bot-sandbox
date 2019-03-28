import React from 'react';
import { useFirestore } from '../connectFirestore';
import { taCollection } from '../../services/firebase';
import TA from './TA';

export default function TAList({ handleDelete }) {
  const question = useFirestore(taCollection, [])
  const list = question.map(doc => {
    return <TA handleDelete={handleDelete} key={doc.id} id={doc.id} name={doc.name} cohort={doc.cohort} />
  })
  return (
    <>
      <h1>TA Leader Board</h1>
      <table className={'leaderTable'}>
        <thead>
          <tr>
            <th className={'tableHeader'}>Name</th>
            <th className={'tableHeader'}>Cohort</th>
            <th className={'tableHeader'}>Claimed Tickets</th>
            <th className={'tableHeader'}>Delete</th>
          </tr>
        </thead>
        <tbody>
          {list}
        </tbody>
      </table>
    </>
  );
}
