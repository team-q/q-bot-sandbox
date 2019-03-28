import React from 'react';
import { useFirestore } from '../connectFirestore';
import { questionCollection } from '../../services/firebase';

export default function Claim({ name }) {
  const claims = useFirestore(questionCollection.where('TA', '==', name))
  if(!claims) return <p>Looking up claims</p>
  
  return (
    <h1>{claims.length}</h1>
  )
}
