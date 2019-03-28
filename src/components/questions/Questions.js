import React, { useState } from 'react';
import { useFirestore } from '../connectFirestore';
import { questionCollection } from '../../services/firebase';
import QuestionsList from './QuestionsList';
import FilterForm from './FilterForm';
import SortForm from './SortForm';
import CohortSort from '../CohortSort';
import ClaimSort from '../ClaimSort';
import Header from '../layout/Header';

const filterClaimed = {
  claimed(TA) {
    return TA
  },
  unclaimed(TA) {
    return !TA
  },
  both(TA) {
    return true
  }
}

 export default function Questions({ providerData }) {
   const [filterValue, setFilterValue] = useState('')
   const [sortValue, setSortValue] = useState('desc');
   const [cohortSortValue, setCohortSortValue] = useState('')
   const [claimSortValue, setClaimSortValue] = useState('both')
  
   const questions = useFirestore(questionCollection.orderBy('timestamp', sortValue), [], sortValue, cohortSortValue, claimSortValue)
   .filter(c => {
      return (c.question.includes(filterValue.toLowerCase()) || c.question.includes(filterValue.toUpperCase())) && c.channelName.includes(cohortSortValue) && filterClaimed[claimSortValue](c.TA)
   })

  return (
    <>
      <Header/>
      <FilterForm value={filterValue} onChange={({target}) => setFilterValue(target.value)}/>
      <SortForm handleChange={({target}) => setSortValue(target.value)} />
      <CohortSort onChange={({target}) => {setCohortSortValue(target.value)}} />
      <ClaimSort onChange={({target}) => {setClaimSortValue(target.value)}} />
      <QuestionsList 
        questions={questions}
        providerData={providerData}
      /> 
    </>
  )
}
