import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth'

firebase.initializeApp({
  apiKey: 'AIzaSyAM_SACKWLecd92TF3n5uUvDclmOLHOTQA',
  authDomain: 'q-bot-test-7d5cb.firebaseapp.com',
  databaseURL: 'https://q-bot-test-7d5cb.firebaseio.com',
  projectId: 'q-bot-test-7d5cb',
  storageBucket: 'q-bot-test-7d5cb.appspot.com',
  messagingSenderId: '894748516124'
})

export const app = firebase

export const firestore = app.firestore()

export const channelCollection = firestore.collection('channel')

const googleProvider = new firebase.auth.GoogleAuthProvider()
const githubProvider = new firebase.auth.GithubAuthProvider()

export const subscribe = (fn, provider) => firebase.auth().onAuthStateChanged(user => {
  if(user) {
    fn(user)
  }
  else if (provider === 'google') {
    firebase.auth().signInWithRedirect(googleProvider)
  }
  else if (provider === 'github') {
    firebase.auth().signInWithRedirect(githubProvider)
  }
})

export const signOut = () => firebase.auth().signOut();