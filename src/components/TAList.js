import React from 'react';
import { useFirestore } from './connectFirestore';
import { taCollection } from '../services/firebase';
import TA from './TA';

export default function TAList({ handleDelete }) {
  const channel = useFirestore(taCollection, [])
  const list = channel.map(doc => {
    console.log(doc);
    return <TA handleDelete={handleDelete} key={doc.id} id={doc.id} name={doc.name} cohort={doc.cohort} />
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
