import React from 'react';
import { useFirestore } from '../connectFirestore';
import { questionCollection } from '../../services/firebase';
import { updateClaim } from '../../actions/TA';

export default function Claim({ name, id }) {
  const claims = useFirestore(questionCollection.where('TA', '==', name))
  if(!claims) return <p>Looking up claims</p>
  else {
    const claimsLength = claims.length;
    updateClaim(claimsLength, id)
    return (
      <p>{claims.length}</p>
    )
  }
}
