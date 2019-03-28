import React, { useState } from 'react';
import FilterForm from './FilterForm';
import SortForm from './SortForm';
import CohortSort from '../CohortSort';
import QuestionsList from './QuestionsList'
import { useFirestore } from '../connectFirestore';
import { questionCollection } from '../../services/firebase';

export default function Questions({ providerData }) {
  const [filterValue, setFilterValue] = useState('')
  const [sortValue, setSortValue] = useState('desc');
  const [cohortSortValue, setCohortSortValue] = useState('')

  const questions = useFirestore(questionCollection.orderBy('timestamp', sortValue), [], sortValue, cohortSortValue)
  .filter(c => {
     return (c.question.includes(filterValue.toLowerCase()) || c.question.includes(filterValue.toUpperCase())) && c.channelName.includes(cohortSortValue)
  })

  return (
    <>
      <FilterForm value={filterValue} onChange={({target}) => setFilterValue(target.value)}/>
      <SortForm handleChange={({target}) => setSortValue(target.value)} />
      <CohortSort onChange={({target}) => {setCohortSortValue(target.value)}} />
      <QuestionsList 
        questions={questions}
        providerData={providerData}
      /> 
    </>
  )
}
