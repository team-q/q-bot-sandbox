import React, { useState } from 'react';

export default function TAForm({ handleSubmit }) {
  const [ name, setName ] = useState('')
  const [ cohort, setCohort ] = useState('')
    return (
      <>
        <h2>Add New TA</h2>
        <form onSubmit={handleSubmit.bind(null, name, cohort)}>
          <label>TA Name</label>
          <input type='text' name='name' value={name} onChange={({target}) => setName(target.value)}/>
  
          <label>Assigned Cohort</label>
          <input type='text' name='cohort' value={cohort} onChange={({target}) => setCohort(target.value)}/>

          <button type='submit'>Submit</button>
        </form>
      </>
    );
}