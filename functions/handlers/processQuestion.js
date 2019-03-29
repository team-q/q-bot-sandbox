const req = require('superagent');

exports.processQuestionHandler = admin => async(snap, context) => {
  const { slackId, messageId, channelId } = snap.data();
  const matches = await admin.firestore().collection('question').where('messageId', '==', messageId).get()
  
  if(matches.docs.length > 1) return admin.firestore().collection('question').doc(context.params.id).delete();
  return req.get(`https://slack.com/api/users.info?token=${process.env.CHANNEL_TOKEN}&user=${slackId}&pretty=1`)
    .then(res => {
      return admin.firestore().collection('question').doc(context.params.id).update({ name: res.body.user.real_name })
      .then(() => {
        return req.get(`https://slack.com/api/conversations.info?token=${process.env.CHANNEL_TOKEN}&channel=${channelId}&pretty=1`)
          .then((res) => {
            admin.firestore().collection('question').doc(context.params.id).update({ channelName: res.body.channel.name })
              return req
                .post('https://hooks.slack.com/services/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')
                .set('Content-Type', 'application/json')
                .send({ text: 'your question has been added to the queue', thread_ts: snap.data().timestamp })
          })
        })
    })
}
