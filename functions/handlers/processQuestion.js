const req = require('superagent');

exports.processQuestionHandler = admin => async (snap, context) => {
  const { slackId, messageId, channelId } = snap.data();
  const matches = await admin.firestore().collection('question').where('messageId', '==', messageId).get()
  if (matches.docs.length > 1) return admin.firestore().collection('question').doc(context.params.id).delete();

  // use config to store sensitive info instead of .env
  const token = functios.config().token;
  return req.get(`https://slack.com/api/users.info?token=${token}&user=${slackId}&pretty=1`)
    .then(res => {
      return admin.firestore().collection('question').doc(context.params.id).update({ name: res.body.user.real_name })
    })
    .then(() => {
      return req.get(`https://slack.com/api/conversations.info?token=${token}&channel=${channelId}&pretty=1`)
    })
    .then((res) => {
      admin.firestore().collection('question').doc(context.params.id).update({ channelName: res.body.channel.name })
      const channel = res.body.channel.name;
      // use configuration to store webhooks
      // we don't want these on github
      // https://firebase.google.com/docs/functions/config-env
      const webhook = functions.config().webhooks[channel];
      if (webhook) {
        return req
          .post(webhook)
          .set('Content-Type', 'application/json')
          .send({ text: 'Your question has been added to the queue!', thread_ts: snap.data().timestamp });
      }
    })
}
