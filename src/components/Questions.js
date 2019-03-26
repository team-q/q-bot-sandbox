import React, { useState } from 'react';
import { useFirestore } from './connectFirestore';
import { channelCollection } from '../services/firebase';
import './Questions.css';
import Question from './Question';
import FilterForm from './FilterForm';
import { Route, Link} from 'react-router-dom'

 export default function Questions({ handleClick }) {
   const [filterValue, setFilterValue] = useState('')
   const channel = useFirestore(channelCollection.orderBy('timestamp', 'desc'), []).filter(c => {
      return c.question.includes(filterValue)
   })

   const questionTableItems = channel && channel.map(doc => {
    return (
      <Question 
        questionObj={doc} 
        handleClick={handleClick} 
        key={doc.id} 
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
    {channel === null && <h1>Loading...</h1>}
    { channel && 
      <>
        <Route>
          <Link to='/leaderboard'>Leaderboard</Link>
        </Route>
       
        <FilterForm value={filterValue} onChange={({target}) => setFilterValue(target.value)}/>
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