import React from 'react';
import { useFirestore } from '../connectFirestore';
import { questionCollection } from '../../services/firebase';

export default function Claim({ taCollectionList }) {
  const help = taCollectionList.map(doc => {
    console.log('doc', doc);
    const matches = useFirestore(questionCollection.where('TA', '==', doc.name))
    return console.log('matches', matches);
  })

  console.log('help', help);

  return (
    <h1>HELLO</h1>
  )
}
