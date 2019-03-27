import React from 'react';

export default function TA({ name, cohort, id, claims, handleDelete}) {
  return (
    <tr className={'tableRow'}>
      <td className={'tableData'}>{name}</td>
      <td className={'tableData'}>{cohort}</td>
      <td className={'tableData'}>{claims}</td>
      <td className={'tableData'}><button className={'taDeleteButton'}onClick={handleDelete.bind(null, id)}>X</button></td>
    </tr>
  )
}