import React, { PureComponent } from 'react';
import TAForm from './TAForm';
import TAList from './TAList';
import { addTA } from '../actions/TA';

export default class LeaderBoard extends PureComponent {
  handleSubmit = (name, cohort, event) => {
    event.preventDefault()
    addTA({ name, cohort })
    console.log('TA added')
  }

  render() {
    return (
      <>
        <h1>TA Leader Board</h1>
        <TAForm handleSubmit={this.handleSubmit}/>
        <TAList />
      </>
    );
  }
}