import React, { useState } from 'react';
import FilterForm from './FilterForm';
import SortForm from './SortForm';
import CohortSort from '../CohortSort';
import QuestionsList from './QuestionsList';

export default function Questions({ providerData }) {
  const [filterValue, setFilterValue] = useState('')
  const [sortValue, setSortValue] = useState('desc');
  const [cohortSortValue, setCohortSortValue] = useState('')

  return (
    <>
      <FilterForm value={filterValue} onChange={({target}) => setFilterValue(target.value)}/>
      <SortForm handleChange={({target}) => setSortValue(target.value)} />
      <CohortSort onChange={({target}) => {setCohortSortValue(target.value)}} />
      <QuestionsList 
        filterValue={filterValue}
        sortValue={sortValue}
        cohortSortValue={cohortSortValue}
        providerData={providerData}
      /> 
    </>
  )
}
