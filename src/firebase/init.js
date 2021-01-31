import firebase from 'firebase/app'

import 'firebase/firestore';
import 'firebase/analytics';
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
  apiKey: "AIzaSyBbGwNSzITlKwaL3pB4fe-jTwr7O-NGIV8",
  authDomain: "material-design-colors-937a7.firebaseapp.com",
  databaseURL: "https://material-design-colors-937a7.firebaseio.com",
  projectId: "material-design-colors-937a7",
  storageBucket: "material-design-colors-937a7.appspot.com",
  messagingSenderId: "1003456854466",
  appId: "1:1003456854466:web:d581fe13ad79038ee5be5b",
  measurementId: "G-2360K089LZ"
};
// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
firebaseApp.firestore().settings({
  timestampsInSnapshots: true
})
firebase.analytics();

export default firebaseApp.firestore()
