const req = require('superagent');

exports.saveCohortNameHandler = admin => async (snap, context) => {
  const { channelId } = snap.data()
  const token = functios.config().token;

  const id = context.params.id;
  return req.get(`https://slack.com/api/conversations.info?token=${token}&channel=${channelId}&pretty=1`)
    .then((res) => {
      const channel = res.body.channel.name;
      return admin.firestore().collection('cohort').doc(id).update({ channelName: channel })
    })
}
