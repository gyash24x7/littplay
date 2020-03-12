import { observable } from "mobx";

class AppState {
	@observable loggedIn = false;
	@observable user: User | null = null;

	constructor() {
		this.initStore();
	}

	async initStore() {
		const user = localStorage.getItem("user");
		if (user) {
			this.user = JSON.parse(user);
			this.loggedIn = true;
		}
	}
}

export const appState = new AppState();

export interface User {
	displayName: string;
	email: string;
	phoneNumber: string;
	photoURL: string;
}
