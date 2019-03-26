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

exports.helloSlack = functions.https.onRequest((request, response) => {
    console.log('request.body: ', request.body);
    /* returns:
    1). 
    {
      token: '***123***',
      team_id: '***123***',
      api_app_id: 'AH0P0PZED',
      event: {
        client_msg_id: 'ABCDE-123',
        type: 'app_mention',
        text: '<@ABCDE> this is a TEST',
        user: 'ABCDE',
        ts: '1553560978.007800', // IN EPOCH / UTC TIME (pst = -8 hours)
        channel: 'ABCDE',
        event_ts: '1553560978.007800'
      },
      type: 'event_callback',
      event_id: 'EvH9GJ8692',
      event_time: 1553560978,
      authed_users: [ 'ABCDE' ]
    }
  */
    return admin.firestore().collection('channel').add({
      messageId: request.body.event.client_msg_id,
      name: '',
      ta: '',
      slackId: request.body.event.user,
      question: request.body.event.text
    })
      .then(() => response.status(200).send(request.body));
});


// SETUP ~ for Slack event subscription Request URL (to verify via challenge setup step)
// exports.helloSlack = functions.https.onRequest((request, response) => {
//   if (request) {
//     console.log('request.body: ', request.body);
//     response.status(200).send(request.body);
//   } else {
//     console.log("Request Error...");
//     throw response.status(500);
//   }
// });
