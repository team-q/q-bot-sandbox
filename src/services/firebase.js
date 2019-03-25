import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth'

firebase.initializeApp({
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  databaseURL: process.env.DB_URL,
  projectId: process.env.DB_URL,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MSG_SENDER_ID,
  timestampsInSnapshots: true
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



