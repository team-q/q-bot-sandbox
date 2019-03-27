import React, { PureComponent } from 'react';
import TAForm from './TAForm';
import TAList from './TAList';
import { addTA, deleteTA } from '../actions/TA';
import './LeaderBoard.scss';
import Header from './Header';

export default class LeaderBoard extends PureComponent {
  handleSubmit = (name, cohort, event) => {
    event.preventDefault();
    addTA({ name, cohort, claimCount: 0});
  }

  handleDelete = (id) => {
    deleteTA(id);
    console.log('TA deleted', id);
  }

  render() {
    return (
      <>
        <Header/>
        <TAForm handleSubmit={this.handleSubmit}/>
        <TAList handleDelete={this.handleDelete} />
      </>
    );
  }
}
