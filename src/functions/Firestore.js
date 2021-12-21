import firebase from 'firebase';
import 'firebase/analytics';

// Replace with your firebase config
const config = {
  apiKey: "AIzaSyC8p7zLaZboIQ64qWUF75N1J8uua3TpY0c",
  authDomain: "nanu-38e9d.firebaseapp.com",
  databaseURL: "https://nanu-38e9d.firebaseio.com",
  projectId: "nanu-38e9d",
  storageBucket: "nanu-38e9d.appspot.com",
  messagingSenderId: "325840131013",
  appId: "1:325840131013:web:ae7e0862f709574ae231ac",
  measurementId: "G-RERJ1TFZNP"
};
firebase.initializeApp(config)
firebase.analytics()
export default firebase