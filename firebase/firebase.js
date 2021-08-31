import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

var firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  };

  if(!firebase.apps.length)
  firebase.initializeApp(firebaseConfig)

const auth=firebase.auth()
const db=firebase.firestore();
const storage=firebase.storage();
const serverTimeStamp=firebase.firestore.FieldValue.serverTimestamp
const increment = firebase.firestore.FieldValue.increment(1);

export {auth,db,storage,serverTimeStamp,increment}