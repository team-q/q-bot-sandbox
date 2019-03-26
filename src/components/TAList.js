import React from 'react';
import { useFirestore } from './connectFirestore';
import { taCollection } from '../services/firebase';
import TA from './TA';

export default function TAList() {
  const channel = useFirestore(taCollection.orderBy('name'))
  const list = channel.map(doc => {
    return <TA name={doc.name} cohort={doc.cohort} />
  })
  return (
    <>
      <h1>TA List</h1>
      <ul>
        {list}
      </ul>
    </>
  );
}
