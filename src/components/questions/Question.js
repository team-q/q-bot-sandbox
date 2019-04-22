import React from 'react';
import { addSolved, rejectQuestion } from '../../actions/questions';
const moment = require('moment');
moment().format();

export default function Question({ questionObj, handleClick }) {
  const { id, name, question, TA, timestamp, solved = false, rejected = false } = questionObj;
  const date = timestamp.toDate();
  const quest = question.replace(/^<@UHEMKNNPP>/g, '');

  let end = moment(date);
  const waitTime = moment(end).toNow(true);

  return (
    <tr key={id} className={solved === true ? 'tableRow solvedTrue' : 'tableRow'}>
      <td className={'tableData'}>{name}</td>
      <td className={'tableData'}>
        {quest}<br /><br />
        <button 
          value={rejected}
          name="rejectedValue"
          onClick={() => rejectQuestion(true, id)}>
          Request Refactor
        </button>
      </td>
      <td className={'tableData'}>
        <p>{date.toLocaleString().split(',').join('')}</p> 
        <span className={(TA !== undefined ? 'Solved' : '')}>Waiting: {waitTime}</span>
      </td>
      <td className={'tableData'}>
        {TA}
        <button
          onClick={handleClick}
          className={'taButton' + (TA ? 'Active' : '')}>
        </button>
      </td>
      <td className={'tableData'} id={'solvedColumn'}>
        <input type='checkbox' name='solvedValue'
          checked={solved}
          value={solved}
          onChange={({ target }) => addSolved(target.checked, id)}
        />
      </td>
    </tr>
  )
}
