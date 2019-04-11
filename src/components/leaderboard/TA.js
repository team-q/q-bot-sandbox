import React from 'react';

export default function TA({ name, cohort, claims }) {
  return (
    <tr className={'tableRow'}>
      <td className={'tableData'}>{name || 'User'}</td>
      <td className={'tableData'}>{cohort || '(No cohort provided)'}</td>
      <td className={'tableData'}>{claims}</td>
    </tr>
  )
}
