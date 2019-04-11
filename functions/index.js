require('dotenv').config();
const functions = require('firebase-functions');
const admin = require('firebase-admin');

const { helloSlackHandler } = require('./handlers/helloSlack');
const { processQuestionHandler } = require('./handlers/processQuestion');
const { saveChannelNameHandler } = require('./handlers/saveSlackChannelName');
const { saveCohortNameHandler } = require('./handlers/saveCohortName');

admin.initializeApp();

exports.helloSlack = functions.https.onRequest(helloSlackHandler(admin));

exports.processQuestion = functions.firestore.document('question/{id}').onCreate(processQuestionHandler(admin));

exports.saveChannelName = functions.firestore.document('question/{id}').onCreate(saveChannelNameHandler(admin));

exports.saveCohortName = functions.firestore.document('cohort/{id}').onCreate(saveCohortNameHandler(admin));

exports.solveQuestion = functions.firestore.document('question/{id}').onUpdate(async (snap, context) => {
  const beforeUpdate = snap.before.data();
  const afterUpdate = snap.after.data();

  if (beforeUpdate.solved !== afterUpdate.solved && afterUpdate.solved) {
    let claim = (await admin.firestore().collection('TA').where('name', '==', afterUpdate.TA).get()).docs[0];
    if (!claim) {
      claim = await admin.firestore().collection('TA')
        .add({
          cohort: afterUpdate.channelName,
          claimCount: 0,
          name: afterUpdate.TA
        })
        .then(snap => snap.get())
    }

    await admin.firestore().collection('TA').doc(claim.id).update({ claimCount: claim.data().claimCount + 1 });
    return admin.firestore().collection('solved')
      .doc(context.params.id)
      .create(afterUpdate)
      .then(() => snap.after.ref.delete());
  }
});
