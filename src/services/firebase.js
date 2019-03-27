import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth'

firebase.initializeApp({
  apiKey: 'AIzaSyAM_SACKWLecd92TF3n5uUvDclmOLHOTQA',
  authDomain: 'q-bot-test-7d5cb.firebaseapp.com',
  databaseURL: 'https://q-bot-test-7d5cb.firebaseio.com',
  projectId: 'q-bot-test-7d5cb',
  storageBucket: 'q-bot-test-7d5cb.appspot.com',
  messagingSenderId: '894748516124',
  timestampsInSnapshots: true
})

export const app = firebase
export const firestore = app.firestore()
export const channelCollection = firestore.collection('channel')
export const taCollection = firestore.collection('TA')

export const auth = app.auth();
export const loginMethod = auth.signInWithPopup;
export const googleProvider = new firebase.auth.GoogleAuthProvider()
export const githubProvider = new firebase.auth.GithubAuthProvider()

export const loginWithProvider = provider => {
  if(provider === 'google') {
    return firebase.auth().signInWithPopup(googleProvider)
  }
  else if(provider === 'github') {
    return firebase.auth().signInWithPopup(githubProvider)
  } else {
    return Promise.resolve()
  }
}

export const subscribe = (fn, noUserFn) => firebase.auth().onAuthStateChanged(user => {
  if(user) {
    fn(user)
  } else {
    noUserFn && noUserFn();
  }
})

export const signOut = () => firebase.auth().signOut();
