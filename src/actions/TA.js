import { taCollection } from '../services/firebase';

export const deleteTA = id => taCollection.doc(id).delete();
export const updateClaim = (length, id) => taCollection.doc(id).update({ claimCount: length });
