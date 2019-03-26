require('dotenv').config();
const functions = require('firebase-functions');
const req = require('superagent');

const admin = require('firebase-admin');
admin.initializeApp();

exports.processQuestion = functions.firestore.document('channel/{id}').onCreate(async(snap, context) => {
  const { slackId, messageId } = snap.data();
  console.log('snap.data(): ', snap.data());
  /* returns:
  2.
  {
    messageId: 'e0d2d9e8-1395-4320-bfdb-bc84aac1f5ce',
    name: '',
    question: '<@UH9QKSGUV> this is a TEST',
    slackId: 'UH538GYG0'
  }
  */
  const matches = await admin.firestore().collection('channel').where('messageId', '==', messageId).get()
  if(matches.docs.length > 1) return admin.firestore().collection('channel').doc(context.params.id).delete();
  return req.get(`https://slack.com/api/users.info?token=${process.env.TOKEN}&user=${slackId}&pretty=1`)
    .then(res => {
      console.log('line 16, slack get request "res.body:" ', res.body);
      /* returns:
      3.
      {
        ok: true,
        user: {
          id: 'ABCDE',
          team_id: 'ABCDE',
          name: 'user.name',
          deleted: false,
          color: '3c989f',
          real_name: 'First Last',
          tz: 'America/Los_Angeles',
          tz_label: 'Pacific Daylight Time',
          tz_offset: -25200,
          profile: {
            title: '',
            phone: '',
            skype: '',
            real_name: 'First Last',
            real_name_normalized: 'First Last',
            display_name: 'username',
            display_name_normalized: 'username',
            status_text: '',
            status_emoji: '',
            status_expiration: 0,
            avatar_hash: 'abcde12345',
            email: 'e***@***.com',
            image_24 ... image_512: 'https://image.png',
            status_text_canonical: '',
            team: 'ABCDE'
          },
          is_admin: false,
          is_owner: false,
          is_primary_owner: false,
          is_restricted: false,
          is_ultra_restricted: false,
          is_bot: false,
          is_app_user: false,
          updated: 1553283935
        }
      }
      */
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
