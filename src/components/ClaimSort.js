import React from 'react';

export default function CohortSort({ selectedValue, onChange }) {
  return (
    <select onChange={onChange} defaultValue={selectedValue}>
      <option value='both'>All</option>
      <option value='claimed'>Claimed</option>
      <option value='unclaimed'>Unclaimed</option>
    </select>
  )
}
