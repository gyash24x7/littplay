import "firebase/auth";

import firebase from "firebase/app";

import config from "../environment";

firebase.initializeApp(config);
export default firebase;
