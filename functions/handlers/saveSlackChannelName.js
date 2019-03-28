exports.saveChannelNameHandler = admin => async(snap) => {
  const { channelId } = snap.data();
  const matches = await admin.firestore().collection('cohort').where('channelId', '==', channelId).get()
  if(!matches.docs.length || matches.docs.length === 0) {
    return admin.firestore().collection('cohort').add({ channelId })
  }
}
