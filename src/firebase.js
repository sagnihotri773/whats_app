import firebase from 'firebase';	

const firebaseConfig = {
  apiKey: "AIzaSyCQUgp5yBtXYDV_A6tpP2GcwvSYcL3Zsj8",
  authDomain: "whats-app-clone-f5f68.firebaseapp.com",
  databaseURL: "https://whats-app-clone-f5f68-default-rtdb.firebaseio.com",
  projectId: "whats-app-clone-f5f68",
  storageBucket: "whats-app-clone-f5f68.appspot.com",
  messagingSenderId: "446730819460",
  appId: "1:446730819460:web:c357bed88b59be226cafd1",
  measurementId: "G-CTD3ECB6JD"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);	

const db = firebaseApp.firestore();	
const auth = firebase.auth();	
const provider = new firebase.auth.GoogleAuthProvider();	
const storage = firebase.storage();

export { auth, provider, storage, firebase, firebaseApp };	
export default db;  