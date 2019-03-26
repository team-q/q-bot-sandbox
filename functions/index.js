require('dotenv').config();
const functions = require('firebase-functions');
const req = require('superagent');

const admin = require('firebase-admin');
admin.initializeApp();

exports.processQuestion = functions.firestore.document('channel/{id}').onCreate(async(snap, context) => {
  const { slackId, messageId } = snap.data();
  console.log('snap.data(): ', snap.data());
  const matches = await admin.firestore().collection('channel').where('messageId', '==', messageId).get()
  if(matches.docs.length > 1) return admin.firestore().collection('channel').doc(context.params.id).delete();
  return req.get(`https://slack.com/api/users.info?token=${process.env.TOKEN}&user=${slackId}&pretty=1`)
    .then(res => {
      console.log('line 16, slack get request "res.body:" ', res.body);
      return admin.firestore().collection('channel').doc(context.params.id).update({ name: res.body.user.real_name })
    })
})

exports.helloSlack = functions.https.onRequest(async(request, response) => {
    console.log('request.body: ', request.body);
    
    return req
      .post('https://hooks.slack.com/services/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')
      .set('Content-Type', 'application/json')
      .send({ text: 'your question has been added to the queue', thread_ts: request.body.event.ts })
      .then(() => {
        return admin.firestore().collection('channel').add({ messageId: request.body.event.client_msg_id, name: '', slackId: request.body.event.user, question: request.body.event.text })
          .then(() => response.status(200).send(request.body))
      })
});
