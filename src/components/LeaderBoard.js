import React, { PureComponent } from 'react';
import TAForm from './TAForm';
import TAList from './TAList';
import { addTA, deleteTA } from '../actions/TA';
import './LeaderBoard.css';

export default class LeaderBoard extends PureComponent {
  handleSubmit = (name, cohort, event) => {
    event.preventDefault();
    addTA({ name, cohort, claimCount: 0});
  }

  handleDelete = (id) => {
    deleteTA(id);
  }

  render() {
    return (
      <>
        <TAForm handleSubmit={this.handleSubmit}/>
        <TAList handleDelete={this.handleDelete} />
      </>
    );
  }
}
