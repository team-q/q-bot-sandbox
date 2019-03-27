import React from 'react';

export default function FilterForm({ value, onChange }) {
  return (
    <>
      <label>Filter by Question:</label>
      <input type="text" name="searchTerm" value={value} onChange={onChange} />
    </>
  )
}
