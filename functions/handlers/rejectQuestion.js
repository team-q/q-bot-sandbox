module.exports = admin => (snap, context) => {
  const beforeUpdate = snap.before.data();
  const afterUpdate = snap.after.data();

  if (beforeUpdate.rejected !== afterUpdate.rejected && afterUpdate.rejected) {
    return admin.firestore().collection('rejected')
      .doc(context.params.id)
      .create(snap.after.data())
      .then(() => snap.after.ref.delete()); 
  }
}
