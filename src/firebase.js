import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
  apiKey: 'AIzaSyDZLD_51diMcEWq60ZwteO5vhCSCrD42x4',
  authDomain: 'my-chat-app-93688.firebaseapp.com',
  projectId: 'my-chat-app-93688',
  storageBucket: 'my-chat-app-93688.appspot.com',
  messagingSenderId: '366238640963',
  appId: '1:366238640963:web:edeb0c0a763b20a8969df6',
  measurementId: 'G-2TSB3P6TJ3',
});

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;
