import { channelCollection } from '../services/firebase';

export const addTA = (ta, id) => channelCollection.doc(id).update({TA: ta})
