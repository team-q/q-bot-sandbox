import React, { PureComponent } from 'react';
import { deleteTA } from '../../actions/TA';
import { taCollection, questionCollection } from '../../services/firebase'

import './LeaderBoard.scss';
import TAList from './TAList';

export default class LeaderBoard extends PureComponent {
  handleDelete = (id) => {
    deleteTA(id);
  }

  getTAs = () => {
    return taCollection.get().then(snap => {
      return snap.docs.map(doc => {
        return console.log(doc.data().name || 'User')
      })
    })
  }

  getCohorts = () => {
    return questionCollection.get().then(snap => {
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
        <TAList
          handleDelete={this.handleDelete}
        />
      </>
    );
  }
}
