
import * as firebase from 'firebase/app';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyDoUjGfzkYA6y7JMdf-FR0E-6ddgfM3Q9E",
  authDomain: "grapevine-pd.firebaseapp.com",
  databaseURL: "https://grapevine-pd.firebaseio.com",
  projectId: "grapevine-pd",
  storageBucket: "grapevine-pd.appspot.com",
  messagingSenderId: "911491514094"
};

export default firebase.initializeApp(config);