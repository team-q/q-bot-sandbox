module.exports = admin => async (snap, context) => {
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
}
