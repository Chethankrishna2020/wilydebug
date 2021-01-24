import * as firebase from 'firebase'
require('@firebase/firestore')
//import '@firebase/firestore'
var firebaseConfig = {
  apiKey: "AIzaSyD6X1RpbkEvq37fykef0VnKARRIDoAgI9A",
  authDomain: "wily-f8a59.firebaseapp.com",
  projectId: "wily-f8a59",
  storageBucket: "wily-f8a59.appspot.com",
  messagingSenderId: "353836842828",
  appId: "1:353836842828:web:09cd5723e505765c5d19e9"
};
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export default firebase.firestore();