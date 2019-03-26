import React from 'react';
import { useFirestore } from './connectFirestore';
import { taCollection } from '../services/firebase';
import TA from './TA';

export default function TAList({ handleDelete }) {
  const channel = useFirestore(taCollection, [])
  const list = channel.map(doc => {
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
            <th className={'tableHeader'}>Claims</th>
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
