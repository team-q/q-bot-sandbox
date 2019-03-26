import React from 'react';

export default function FilterForm({ value, onChange }) {
  return (
    <input type="text" name="searchTerm" value={value} onChange={onChange} />
  )
}
