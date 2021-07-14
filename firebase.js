import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

var firebaseConfig = {
    apiKey: "AIzaSyAOh-EkkIQpffBODSccNXj5zxD1Q0UyOPw",
    authDomain: "kaalashiva-2d81e.firebaseapp.com",
    projectId: "kaalashiva-2d81e",
    storageBucket: "kaalashiva-2d81e.appspot.com",
    messagingSenderId: "355605715237",
    appId: "1:355605715237:web:c1152c1fcac0a97aa6a2cc",
    measurementId: "G-C1MJPXKM6H"
  };

  if(!firebase.apps.length)
  firebase.initializeApp(firebaseConfig)

const auth=firebase.auth()
const db=firebase.firestore();
const storage=firebase.storage();
const serverTimeStamp=firebase.firestore.FieldValue.serverTimestamp

export {auth,db,storage,serverTimeStamp}