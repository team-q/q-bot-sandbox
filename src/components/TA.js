import React from 'react';

export default function TA({ name, cohort}) {
  return (
    <li>
      <p>{name}</p>
      <p>{cohort}</p>

    </li>
  )
}