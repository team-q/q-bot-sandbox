import React, { useState } from 'react';
import { useFirestore } from '../connectFirestore';
import { questionCollection } from '../../services/firebase';
import Header from '../layout/Header';
import './Questions.scss';
import Question from './Question';
import FilterForm from './FilterForm';
import SortForm from './SortForm';
import { addClaim } from '../../actions/questions';
// import CohortSort from './CohortSort';

 export default function Questions({ providerData }) {
   const [filterValue, setFilterValue] = useState('')
   const [sortValue, setSortValue] = useState('desc');

   const question = useFirestore(questionCollection.orderBy('timestamp', sortValue), [], sortValue)
   .filter(c => {
      return c.question.includes(filterValue.toLowerCase()) || c.question.includes(filterValue.toUpperCase())
   })
  const [taName] = useState(providerData[0].displayName);

   const questionTableItems = question && question.map(doc => {
    return (
      <Question 
        questionObj={doc} 
        key={doc.id} 
        providerData={providerData}
        handleClick={(id) => addClaim(taName, id)}
      />
    )
  })

  const headers = ['Name', 'Question', 'Timestamp', 'TA'];
  const headersList = headers.map((header, i) => {
    return (
      <th className={'tableHeader'} key={i}>
        {header}
      </th>
    )
  })

   return (
    <>
    <Header />
    {question === null && <h1>Loading...</h1>}
    { question && 
      <>
        <FilterForm value={filterValue} onChange={({target}) => setFilterValue(target.value)}/>
        
        <SortForm value={sortValue} 
          handleChange={({target}) => setSortValue(target.value)} 
        />
        <h1>TA Queue</h1>
        <table className={'qBotTable'}>
          <thead>
            <tr>
              {headersList}
            </tr>
          </thead>
          <tbody>
            {questionTableItems}
          </tbody>
        </table> 
      </>
    }
  </>
  )
}
