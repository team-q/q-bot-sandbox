import { useState, useEffect } from 'react';
import { app } from '../services/firebase'; 

 export const useFirestore = (ref, initialState = null, id = null, val = null, val2 = null) => {
  const [ data, setData ] = useState(initialState);
  
  useEffect(() => {
    return ref.onSnapshot(snap => {
      if(snap instanceof app.firestore.DocumentSnapshot) { 
        setData({ ...snap.data(), id: snap.id })
      } 
      else if(snap instanceof app.firestore.QuerySnapshot) { 
        const data = snap.docs.map(doc => ({ ...doc.data(), id: doc.id }))
        setData(data)
      }
    });
  }, [id, val, val2])
  
  return data;
}
