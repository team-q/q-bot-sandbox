module.exports = admin => (snap, context) => {
  
  return admin.firestore().collection('rejected')
    .doc(context.params.id)
    .create(snap.after.data())
    .then(() => snap.after.ref.delete()); 
}
