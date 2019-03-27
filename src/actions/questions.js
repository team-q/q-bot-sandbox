import { channelCollection } from '../services/firebase';

export const addClaim = (ta, id) => channelCollection.doc(id).update({TA: ta})
