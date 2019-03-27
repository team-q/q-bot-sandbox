import React, { PureComponent } from 'react';
import TAForm from './TAForm';
import TAList from './TAList';
import { addTA, deleteTA } from '../actions/TA';
import { taCollection, channelCollection } from '../services/firebase'
import './LeaderBoard.scss';
import Header from './Header';
import CohortSort from './CohortSort';

export default class LeaderBoard extends PureComponent {
  
  handleSubmit = (name, cohort, event) => {
    event.preventDefault();
    const user = this.props.providerData[0].displayName
    addTA({ name: user, cohort, claimCount: 0});
  }

  handleDelete = (id) => {
    deleteTA(id);
  }

  getTAs = () => {
    return taCollection.get().then(snap => {
      return snap.docs.map(doc => {
        return console.log(doc.data().name)
      })
    })
  }

  getCohorts = () => {
    return channelCollection.get().then(snap => {
      return snap.docs.map(doc => {
        return doc.data().channelName;
      })
    })
  }

  componentDidMount() {
    this.getTAs()
    this.getCohorts()
  }

  render() {
    return (
      <>
        <Header/>
        <CohortSort getCohorts={this.getCohorts}/>
        <TAForm 
          user={this.props.providerData[0].displayName} 
          handleSubmit={this.handleSubmit}
        />
        <TAList 
          handleDelete={this.handleDelete} 
        />
      </>
    );
  }
}
