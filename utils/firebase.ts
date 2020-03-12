import "firebase/auth";
import "firebase/firestore";

import firebase from "firebase/app";

import config from "../environment";

firebase.initializeApp(config);

export const AuthProvider = new firebase.auth.GoogleAuthProvider();

export default firebase;
export const db = firebase.firestore();
