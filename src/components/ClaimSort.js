import React from 'react';

export default function ClaimSort({ selectedValue, onChange }) {
  return (
    <label>
      Sort By Claimed Status:
      <select onChange={onChange} defaultValue={selectedValue}>
        <option value='both'>All</option>
        <option value='claimed'>Claimed</option>
        <option value='unclaimed'>Unclaimed</option>
      </select>
    </label>
  )
}
