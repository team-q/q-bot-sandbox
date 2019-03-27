import React, { PureComponent } from 'react';
import TAForm from './TAForm';
import TAList from './TAList';
import { addTA, deleteTA } from '../actions/TA';
import './LeaderBoard.css';
import { taCollection } from '../services/firebase'
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

  componentDidMount() {
    this.getTAs()
  }

  render() {
    return (
      <>
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
