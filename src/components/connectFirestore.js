import { useState, useEffect } from 'react';
import { app } from '../services/firebase'; // will eventually be passed in as 'ref'

 export const useFirestore = (ref, initialState = null) => {
  const [ data, setData ] = useState(initialState);
  
  useEffect(() => {
    return ref.onSnapshot(snap => {
      if(snap instanceof app.firestore.DocumentSnapshot) { // DocumentSnapshot = one item in collection
        setData({ ...snap.data(), id: snap.id })
      } 
      else if(snap instanceof app.firestore.QuerySnapshot) { // QuerySnapshot = array of documents, list of docs
        const data = snap.docs.map(doc => ({ ...doc.data(), id: doc.id }))
        setData(data)
      }
    });
  }, [false])
  
  return data;
}
