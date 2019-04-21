const request = require('superagent');

const functions = require('firebase-functions');

const respond = async (channelId, message, threadId) => {
  const { body } = await request
    .get(`https://slack.com/api/conversations.info?token=${process.env.CHANNEL_TOKEN}&channel=${channelId}&pretty=1`);
  const channelName = body.channel.name;
  const hook = functions.config().hooks[channelName];
  await request
    .post(hook)
    .set('Content-Type', 'application/json')
    .send({ text: message, thread_ts: threadId })
  return channelName;
}

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
      channelName
    });
}
