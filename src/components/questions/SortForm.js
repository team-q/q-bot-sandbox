import React from 'react';

export default function SortForm({ handleChange }) {
  return (
    <>
      <label className={'sortLabel'}>By Time:
        <select onChange={handleChange}>
          <option name="desc" value="desc">Descending</option>
          <option name="asc" value="asc">Ascending</option>
        </select>
      </label>
    </>
  )
}
