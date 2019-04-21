const request = require('superagent');

const respond = require('./respond');

exports.processQuestionHandler = admin => async (snap, context) => {
  const { slackId, messageId, channelId, threadId } = snap.data();
  const matches = await admin.firestore().collection('question').where('messageId', '==', messageId).get()
  if (matches.docs.length > 1) return admin.firestore().collection('question').doc(context.params.id).delete();

  const spam = await admin.firestore().collection('question')
    .where('slackId', '==', slackId)
    .where('solved', '==', false)
    .get();

  if (spam.docs.length > 1) {
    await admin.firestore().collection('question').doc(context.params.id).delete();
    return respond(channelId, 'Don\'t spam the queue!', threadId)
  }

  const { body } = await request.get(`https://slack.com/api/users.info?token=${process.env.CHANNEL_TOKEN}&user=${slackId}&pretty=1`);
  const channelName = await respond(channelId, 'Your question has been added to the queue!', threadId);

  return admin.firestore().collection('question')
    .doc(context.params.id)
    .update({
      name: body.user.real_name,
      slackHandle: body.user.name,
      channelName
    });
}
