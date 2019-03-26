import { channelCollection } from '../services/firebase';

export const addTA = (ta, id) => channelCollection.doc(id).update({TA: ta})

export const filterMessages = (searchTerm) => channelCollection.where("name", "==", searchTerm)
