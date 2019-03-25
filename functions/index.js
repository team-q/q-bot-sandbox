const functions = require('firebase-functions');

const admin = require('firebase-admin');
admin.initializeApp();

exports.helloSlack = functions.https.onRequest((request, response) => {
  // if (request) {
    // console.log('request.body: ', request.body);
    // response.status(200).send(request.body);

    return admin.firestore().collection('channel').add({ name: request.body.event.user, question: request.body.event.text })
      .then(user => {
        return request.get('https://slack.com/api/users.info?token=xoxp-579541968176-583390193862-577364688145-c5955328b628f04f9825ef4105db7ffb&user=UH5BG5PRC&pretty=1')
          .then(results => {
            // const { id } = user.id;
            const id = '7E7EcfcvAcCnzMa9Poqk';
            return admin.firestore().collection('channel').doc(id).update({ ...user, name: results.real_name })
          })
      })

    // return admin.database().ref('/slack').push({ body: request.body });
  // } else {
  //   console.log("Request Error...");
  //   throw response.status(500);
  // }
});
