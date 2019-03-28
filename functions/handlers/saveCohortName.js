const req = require('superagent');

exports.saveCohortNameHandler = admin => async(snap, context) => {
  const { channelId } = snap.data()
  const id = context.params.id;
  return req.get(`https://slack.com/api/channels.info?token=${process.env.CHANNEL_TOKEN}&channel=${channelId}&pretty=1`)
    .then((res) => {
      const channel = res.body.channel.name;
      return admin.firestore().collection('cohort').doc(id).update({ channelName: channel })
    })
}
