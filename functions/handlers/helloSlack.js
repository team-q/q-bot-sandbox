exports.helloSlackHandler = admin => (request, response) => {
  return admin.firestore().collection('question').add({
    messageId: request.body.event.client_msg_id,
    name: '',
    slackId: request.body.event.user,
    question: request.body.event.text,
    timestamp: new Date(Number.parseFloat(request.body.event.ts) * 1000),
    threadId: request.body.event.ts,
    channelId: request.body.event.channel,
    channelName: '',
    solved: false
  })
    .then(() => response.status(200).send(request.body))
}
