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
        const { channelId, userId, threadId } = snap.before.data();
        const message = `<@${userId}>, looks like we need more information to better assist you. Please refactor your question and resubmit for TA assistance.`;
        return respond(channelId, message, threadId)
      });
  }
}

