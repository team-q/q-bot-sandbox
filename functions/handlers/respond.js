const request = require('superagent');
const functions = require('firebase-functions');

module.exports = async (channelId, message, threadId) => {
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
