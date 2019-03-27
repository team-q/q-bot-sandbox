import React, { useState } from 'react';

export default function TAForm({ user, handleSubmit }) {
  const [ name ] = useState('')
  const [ cohort, setCohort ] = useState('')
    return (
      <>
        <h2>Add New TA</h2>
        <form id='taForm' className={'taForm'} onSubmit={handleSubmit.bind(this, name, cohort)}>
          <label>TA Name</label>
          <input 
            type='text' 
            name='name' 
            value={user} 
            disabled="disabled"
          />
  
          <label>Cohort</label>
          <input 
            type='text' 
            name='cohort' 
            value={cohort} 
            onChange={({target}) => setCohort(target.value)}
          />

          <button className={'submit'} type="submit">Submit</button>
        </form>
      </>
    );
}
