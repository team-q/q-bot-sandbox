import React, { PureComponent } from 'react';
import TAForm from './TAForm';
import TAList from './TAList';
import { addTA, deleteTA } from '../actions/TA';
import './LeaderBoard.css';
// import { useState } from 'react';

export default class LeaderBoard extends PureComponent {
  handleSubmit = (name, cohort, event) => {
    event.preventDefault();
    addTA({ name, cohort });
    console.log('TA added');
    const form = document.getElementById('taForm')
    form.reset()
  }

  handleDelete = (id) => {
    deleteTA(id);
    console.log('TA deleted', id);
  }

  render() {
    return (
      <>
        <h1>TA Leader Board</h1>
        <TAForm handleSubmit={this.handleSubmit}/>
        <TAList handleDelete={this.handleDelete} />
      </>
    );
  }
}