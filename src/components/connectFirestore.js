import React from 'react';
import { app, channelCollection } from '../services/firebase'; // will eventually be passed in as 'ref'

 export const connectFirestore = (ref, key = 'data') => Component => {
  class ConnectFirestore extends React.PureComponent {
    state = {
      data: null
    }

     componentDidMount() {
      this.unsubscribe = channelCollection.orderBy('name').onSnapshot(snap => {
        if(snap instanceof app.firestore.DocumentSnapshot) { // DocumentSnapshot = one item in collection
          this.setState({ data: { ...snap.data(), id: snap.id } })
        } 
        else if(snap instanceof app.firestore.QuerySnapshot) { // QuerySnapshot = array of documents, list of docs
          const data = snap.docs.map(doc => ({ ...doc.data(), id: doc.id }))
          this.setState({ data })
        }
      });
    }

     componentWillUnmount() {
      this.unsubscribe && this.unsubscribe();
    }

     render() {
      const props = { ...this.props, [key]: this.state.data};
      return (
        <Component { ...props } />
      )
    }
  }

   return ConnectFirestore;
}
