import React, { useState } from 'react';
import { useFirestore } from './connectFirestore';
import { channelCollection } from '../services/firebase';
import Header from './Header';
import './Questions.css';
import Question from './Question';
import FilterForm from './FilterForm';
import SortForm from './SortForm';
import { addClaim } from '../actions/questions';

 export default function Questions({ providerData }) {
   const [filterValue, setFilterValue] = useState('')
   const [sortValue, setSortValue] = useState('desc');

   const channel = useFirestore(channelCollection.orderBy('timestamp', sortValue), [], sortValue)
   .filter(c => {
      return c.question.includes(filterValue.toLowerCase()) || c.question.includes(filterValue.toUpperCase())
   })
  const [taName] = useState(providerData[0].displayName);

   const questionTableItems = channel && channel.map(doc => {
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
    {channel === null && <h1>Loading...</h1>}
    { channel && 
      <>
        <FilterForm value={filterValue} onChange={({target}) => setFilterValue(target.value)}/>
        
        <SortForm value={sortValue} 
          handleChange={({target}) => setSortValue(target.value)} 
        />
        
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
