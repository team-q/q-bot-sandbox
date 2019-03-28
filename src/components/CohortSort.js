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

    let cohortName = '';

  return (
    <label>
      Select a Cohort:
      <select onChange={onChange} defaultValue={cohortName} required>
        <option  disabled value=''>Select Cohort</option>
        {cohortsList}
      </select>
    </label>
  )
}
