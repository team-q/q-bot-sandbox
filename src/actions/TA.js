import { taCollection } from '../services/firebase';

export const addTA = TA => taCollection.add(TA);
export const deleteTA = id => taCollection.doc(id).delete()