const respond = require('./respond');

module.exports = admin => (snap, context) => {
  const beforeUpdate = snap.before.data();
  const afterUpdate = snap.after.data();

  if (beforeUpdate.rejected !== afterUpdate.rejected && afterUpdate.rejected) {
    return admin.firestore().collection('rejected')
      .doc(context.params.id)
      .create(snap.after.data())
      .then(() => snap.after.ref.delete())
      .then(() => {
        console.log('after', snap.before.data());
        const { channelId, slackHandle, threadId } = snap.before.data();
        const message = `@${slackHandle}, your question has been rejected!`;
        return respond(channelId, message, threadId)
      })
  }
}
