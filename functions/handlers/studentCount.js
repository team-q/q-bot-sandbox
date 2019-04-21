module.exports = admin => (snap, context) => {
  const { slackId: id, name } = snap.data();
  return admin.firestore().collection('students').doc(id).get()
    .then(doc => {
      let data = doc.data();
      if (!data) {
        data = { id, name, count: 0 }
      }
      return doc.ref.set({ ...data, count: data.count + 1 })
    })
}
