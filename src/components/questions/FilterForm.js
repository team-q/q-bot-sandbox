import React from 'react';

export default function FilterForm({ value, onChange }) {
  return (
    <>
      <h2 className={'addFilterHeader'}>Filter & Sort </h2>
      <label className={'questionLabel'}>Question:</label>
      <input type="text" name="searchTerm" value={value} onChange={onChange} />
    </>
  )
}
