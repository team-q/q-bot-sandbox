import React from 'react';
import { cohortCollection } from '../services/firebase';
import {useFirestore} from './connectFirestore';

export default function CohortSort() {

  const cohortsList = useFirestore(cohortCollection, [])
    .map(cohort => {
      return (
        <li key={cohort.channelId}>
          {cohort.channelName}
        </li>
      )
    })

  return (
    <ul>
      {cohortsList}
    </ul>
  )
}
