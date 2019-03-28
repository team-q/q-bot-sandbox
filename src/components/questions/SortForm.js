import React from 'react';

export default function SortForm({ value, handleChange}) {
  return (
    <>
      <label className={'sortLabel'}>Sort By Time:</label>
      <select onChange={handleChange}>
        <option name="desc" value="desc">Descending</option>
        <option name="asc" value="asc">Ascending</option>
      </select>
    </>
  )
}
