import { questionCollection } from '../services/firebase';

export const addClaim = (ta, id) => questionCollection.doc(id).update({TA: ta})
export const addSolved = (solvedValue, id) => questionCollection.doc(id).update({Solved: solvedValue});

