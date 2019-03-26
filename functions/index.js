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

exports.helloSlack = functions.https.onRequest((request, response) => {
  // if (request) {
    console.log('request.body: ', request.body);
    // response.status(200).send(request.body);

    return req
          .post('https://hooks.slack.com/services/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')
          .set('Content-Type', 'application/json')
          .send({ text: 'hello w' })
          .then(() => response.status(200).send(request.body))
          .then((res) => {
            console.log('res', res.body)
            return admin.firestore().collection('channel').add({ messageId: request.body.event.client_msg_id, name: '', TA: '', slackId: request.body.event.user, question: request.body.event.text })
              .then(() => response.status(200).send(request.body))
              .then(() => {
                console.log('line 18, hit request')
              })
          })

      //   const userSnap = await snap.get();
      //   console.log('line 17 snap: ', snap);
      //   const userObj = userSnap.data(); // name
      //   const docID = userSnap.id; // doc id

      //   // const docId = snap._path.segments[1];

      //   return req.get('https://slack.com/api/users.info?token=xoxp-579541968176-583390193862-584929040352-c60bce2126fa813107661000a0fcbd85&user=UH5BG5PRC&pretty=1')
      //   // return request.get('https://yesno.wtf/api', {
      //   //   headers: {
      //   //     'Content-Type': 'application/json'
      //   //   }
      //   // })
      //     .then(async(results) => {
      //       await console.log('line 16, slack get request "results:" ', results);
      //       // return admin.firestore().collection('channel').doc(id).update({ ...user, name: results.real_name })
      //     })
      // })

    // return admin.database().ref('/slack').push({ body: request.body });
  // } else {
  //   console.log("Request Error...");
  //   throw response.status(500);
  // }
});
