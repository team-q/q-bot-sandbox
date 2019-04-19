import React from 'react';

export default function FilterForm({ value, onChange }) {
  return (
    <>
      <label className={'questionLabel'}>By Question:
        <input type="text" name="searchTerm" value={value} onChange={onChange} />
      </label>
    </>
  )
}
