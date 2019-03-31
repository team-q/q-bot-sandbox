import { useState, useEffect } from 'react';
import { app } from '../services/firebase';

// use ...rest to pass in and grab any number of
// arguments/parameters
export const useFirestore = (ref, initialState = null, ...rest) => {
  const [data, setData] = useState(initialState);

  useEffect(() => {
    return ref.onSnapshot(snap => {
      if (snap instanceof app.firestore.DocumentSnapshot) {
        setData({ ...snap.data(), id: snap.id })
      }
      else if (snap instanceof app.firestore.QuerySnapshot) {
        const data = snap.docs.map(doc => ({ ...doc.data(), id: doc.id }))
        setData(data)
      }
    });
  }, rest)

  return data;
}
