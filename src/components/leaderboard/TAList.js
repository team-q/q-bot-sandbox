import React from 'react';
import { useFirestore } from '../connectFirestore';
import { taCollection } from '../../services/firebase';
import TA from './TA';

export default function TAList({ handleDelete }) {
  const taCollectionList = useFirestore(taCollection.orderBy('claimCount', 'desc'), [])
  const list = taCollectionList.map(doc => {
    return <TA
      key={doc.id}
      name={doc.name}
      cohort={doc.cohort}
      claims={doc.claimCount}
    />
  })

  return (
    <>
      <h1 className={'center-align'}>TA Leader Board</h1>
      <table className={'leaderTable'}>
        <thead>
          <tr>
            <th className={'tableHeader'}>Name</th>
            <th className={'tableHeader'}>Cohort</th>
            <th className={'tableHeader'}>Claimed Tickets</th>
          </tr>
        </thead>
        <tbody>
          {list}
        </tbody>
      </table>
    </>
  );
}
