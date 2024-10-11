import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/storage';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyAfqy61orpTG1CseQ34atucOv6YdftEJ_M",
    authDomain: "zmail-5e630.firebaseapp.com",
    projectId: "zmail-5e630",
    storageBucket: "zmail-5e630.appspot.com",
    messagingSenderId: "126883087286",
    appId: "1:126883087286:web:6bd3d570e3378795e43717"
  };

  const firebaseApp= firebase.initializeApp(firebaseConfig);
  const db=firebaseApp.firestore();
  const storage= firebase.storage();

  const auth= firebase.auth();
  const provider= new firebase.auth.GoogleAuthProvider();

  export {db, auth, provider,storage}