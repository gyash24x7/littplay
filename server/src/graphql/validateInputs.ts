import { CreateTeamsInput, CreateUserInput, LoginInput } from "./generated";

const emailRegex = /^([a-zA-Z0-9_\-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;

export const validateCreateUserInput = (val: CreateUserInput) => {
	switch (true) {
		case !val.email:
			return "Email cannot be Empty!";
		case !val.name:
			return "Name cannot be Empty!";
		case val.password.length < 8:
			return "Password should be longer than 8 characters!";
		case !emailRegex.test(val.email):
			return "Invalid Email!";
	}

	return;
};

export const validateLoginInput = (val: LoginInput) => {
	switch (true) {
		case !val.email:
			return "Email cannot be Empty!";
		case val.password.length < 8:
			return "Password should be longer than 8 characters!";
		case !emailRegex.test(val.email):
			return "Invalid Email!";
	}

	return;
};

export const validateCreateTeamsInput = (val: CreateTeamsInput) => {
	switch (true) {
		case val.teams.length !== 2:
			return "There can be only two teams!";
		case !val.teams[0]:
		case !val.teams[1]:
			return "Team Names cannot be Empty!";
	}

	return;
};
