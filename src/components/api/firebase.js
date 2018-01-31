import firebase from "firebase";

const config = {
  apiKey: "AIzaSyAxx87xVbVChAwxgBzXLraFkqt1elyEdWE",
    authDomain: "beezer-d0510.firebaseapp.com",
    databaseURL: "https://beezer-d0510.firebaseio.com",
    projectId: "beezer-d0510",
    storageBucket: "beezer-d0510.appspot.com",
    messagingSenderId: "856928650877"
	};

firebase.initializeApp(config);
const firebaseDB = firebase.database();

export default firebaseDB;
