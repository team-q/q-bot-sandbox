import React, { PureComponent } from 'react';
import TAForm from './TAForm';
import TAList from './TAList';
import { addTA, deleteTA } from '../actions/TA';
import './LeaderBoard.css';
import { taCollection } from '../services/firebase'
export default class LeaderBoard extends PureComponent {
  handleSubmit = (name, cohort, event) => {
    event.preventDefault();
    addTA({ name, cohort, claimCount: 0});
  }

  handleDelete = (id) => {
    deleteTA(id);
  }

  getTAs = () => {
    return taCollection.get().then(snap => {
      return snap.docs.map(doc => {
        return console.log(doc.data())
      })
    })
    // .map(ta => {
    //   return console.log(ta.data());
    // })
  }

  componentDidMount() {
    this.getTAs()
  }
  // const claimCount = channelCollection.where('TA', '==', )

  render() {
    return (
      <>
        <TAForm handleSubmit={this.handleSubmit}/>
        <TAList handleDelete={this.handleDelete} />
      </>
    );
  }
}
