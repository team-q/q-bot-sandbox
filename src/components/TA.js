import React from 'react';

export default function TA({ name, cohort, id, handleDelete}) {
  return (
    <li>
      <p>{name}</p>
      <p>{cohort}</p>
      <button onClick={handleDelete.bind(null, id)}>X</button>
    </li>
  )
}