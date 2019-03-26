import React from 'react';
import { filterMessages } from '../actions/questions';

export default function FilterForm() {
  return (
    <input type="text" name="searchTerm" onChange={filterMessages} />
  )
}
