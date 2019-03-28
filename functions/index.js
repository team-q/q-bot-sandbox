require('dotenv').config();
const functions = require('firebase-functions');
const req = require('superagent');

const admin = require('firebase-admin');
admin.initializeApp();

exports.processQuestion = functions.firestore.document('question/{id}').onCreate(async(snap, context) => {
  const { slackId, messageId, channelId } = snap.data();
  console.log('snap.data(): ', snap.data());
  
  const matches = await admin.firestore().collection('question').where('messageId', '==', messageId).get()
  
  if(matches.docs.length > 1) return admin.firestore().collection('question').doc(context.params.id).delete();
  return req.get(`https://slack.com/api/users.info?token=${process.env.CHANNEL_TOKEN}&user=${slackId}&pretty=1`)
    .then(res => {
      return admin.firestore().collection('question').doc(context.params.id).update({ name: res.body.user.real_name })
      .then(() => {
        return req.get(`https://slack.com/api/channels.info?token=${process.env.CHANNEL_TOKEN}&channel=${channelId}&pretty=1`)
          .then((res) => {
            return admin.firestore().collection('question').doc(context.params.id).update({ channelName: res.body.channel.name })
          })
        })
    })
    .then(() => {
      return req
        .post('https://hooks.slack.com/services/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')
        .set('Content-Type', 'application/json')
        .send({ text: 'your question has been added to the queue', thread_ts: snap.data().timestamp })
    })
});

exports.saveChannel = functions.firestore.document('question/{id}').onCreate(async(snap) => {
  const { channelId } = snap.data();
  
  const matches = await admin.firestore().collection('cohort').where('channelId', '==', channelId).get()
  if(!matches.docs.length || matches.docs.length === 0) {
    return admin.firestore().collection('cohort').add({ channelId })
    // .then(() => {
    //     return req.get(`https://slack.com/api/channels.info?token=xoxb-585473971876-587835900981-asCQX1py9fSSXW25VXQMWPsZ&channel=${channelId}&pretty=1`)
    //       .then((res) => {
    //         console.log(res.body.channel.id);
    //         return admin.firestore().collection('cohort').where('channelId', '==', res.body.channel.id).get()
    //           .then((matches) => {
    //             console.log('DOCS', matches.docs); // snap doesnt work 
    //             return admin.firestore().collection('cohort').doc(matches.docs[0].id).update({ channelName: res.body.channel.name })
    //           })
    //       })
    //     })
      }
    })

exports.saveCohortName = functions.firestore.document('cohort/{id}').onCreate(async(snap, context) => {
  const { channelId } = snap.data()
  const id = context.params.id;
  return req.get(`https://slack.com/api/channels.info?token=xoxb-585473971876-587835900981-asCQX1py9fSSXW25VXQMWPsZ&channel=${channelId}&pretty=1`)
    .then((res) => {
      const channel = res.body.channel.name;
      return admin.firestore().collection('cohort').doc(id).update({ channelName: channel })
    })
  })
     

exports.helloSlack = functions.https.onRequest((request, response) => {
  console.log('request.body: ', request.body);
      return admin.firestore().collection('question').add({
        messageId: request.body.event.client_msg_id,
        name: '',
        slackId: request.body.event.user,
        question: request.body.event.text,
        timestamp: request.body.event.ts,
        channelId: request.body.event.channel,
        channelName: ''
      })
        .then(() => response.status(200).send(request.body))
});
