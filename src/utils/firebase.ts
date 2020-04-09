import "firebase/auth";
import "firebase/firestore";

import firebase from "firebase/app";

import config from "../environment";
import { User } from "../typings";

firebase.initializeApp(config);

export const AuthProvider = new firebase.auth.GoogleAuthProvider();

export default firebase;
export const db = firebase.firestore();

export const onAuthStateChanged = (callback: (user: User) => void) => {
	return firebase.auth().onAuthStateChanged((user) => {
		callback({
			loggedIn: !!user,
			email: user?.email || "",
			name: user?.displayName || ""
		});
	});
};

export const defaultUser: User = { loggedIn: false, name: "", email: "" };
