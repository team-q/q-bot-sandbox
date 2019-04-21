import { questionCollection } from '../services/firebase';

export const addClaim = (ta, id) => {
  return questionCollection.doc(id).get()
    .then(snap => {
      const { TA } = snap.data();
      if (!TA) {
        questionCollection.doc(id).update({ TA: ta })
      } else if (TA === ta) {
        questionCollection.doc(id).update({ TA: null })
      }
    })
}
export const addSolved = (solvedValue, id) => questionCollection.doc(id).update({ solved: solvedValue });
export const rejectQuestion = (rejectedValue, id) => questionCollection.doc(id).update({ rejected: rejectedValue });
