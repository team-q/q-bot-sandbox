import React from 'react';

export default function Question({questionObj, handleClick}) {
  const { id, name, question, TA, timestamp } = questionObj;
  const date = new Date(timestamp * 1000);
  const quest = question.split('> ')[1];

  return (
    <tr key={id} className={'tableRow'}>
      <td className={'tableData'}>{name}</td>
      <td className={'tableData'}>{quest}</td>
      <td className={'tableData'}>{date.toLocaleString().split(',').join('')}</td>
      <td className={'tableData'}>
        {TA}
        <button 
          onClick={handleClick.bind(null, id)} 
          className={'taButton' + (TA !== undefined ? 'Active' : '')}>
        </button>
      </td>
    </tr>
  )
}