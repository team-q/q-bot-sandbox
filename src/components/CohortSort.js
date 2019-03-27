import React from 'react';
import { useFirestore } from './connectFirestore';
import { channelCollection } from '../services/firebase';
export default function CohortSort({ getCohorts }) {
  const cohorts = useFirestore()
  return (

  )
}