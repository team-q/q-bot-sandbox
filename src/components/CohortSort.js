import React from 'react';
import { cohortCollection } from '../services/firebase';
import {useFirestore} from './connectFirestore';

export default function CohortSort({ onChange }) {

  const cohortsList = useFirestore(cohortCollection, [])
    .map(cohort => {
      return (
        <option 
          name={cohort.channelName}
          value={cohort.channelName}
          key={cohort.channelId}
        >
          {cohort.channelName}
        </option>
      )
    })

  return (
    <select onChange={onChange}>
      {cohortsList}
    </select>
  )
}
