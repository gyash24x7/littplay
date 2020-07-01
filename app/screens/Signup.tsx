import { useNavigation } from "@react-navigation/native";
import { Button, Input, Layout, Spinner, Text } from "@ui-kitten/components";
import React, { useContext, useState } from "react";
import { AsyncStorage, Image, StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useCreateUserMutation } from "../generated";
import globalStyles from "../theme/globalStyles";
import styles from "../theme/loginStyles";
import { AuthContext } from "../utils/context";

const emailRegex = /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;

export const SignupScreen = () => {
	const [createUser, { loading }] = useCreateUserMutation({
		async onCompleted(data) {
			if (data.createUser) {
				await AsyncStorage.setItem("authToken", data.createUser);
				setIsAuthenticated(!!data.createUser);
			}
		},
		onError(err) {
			console.log(err);
			setErrorMsg(err.message);
		}
	});

	const navigation = useNavigation();

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [name, setName] = useState("");
	const [errorMsg, setErrorMsg] = useState<string>();
	const { setIsAuthenticated } = useContext(AuthContext)!;

	const validateFields = (): string | undefined => {
		switch (true) {
			case !name:
				return "Name is Required";
			case !email:
				return "Email is Required";
			case !emailRegex.test(email):
				return "Invalid Email1";
			case !password || !confirmPassword:
				return "Password is Required1";
			case password.length < 8:
				return "Password Length should be more than 8";
			case password !== confirmPassword:
				return "Passwords do not Match";
		}

		return;
	};

	const handleSubmit = () => {
		const errorMsg = validateFields();
		if (!errorMsg) {
			createUser({ variables: { name, email, password } });
		}
		setErrorMsg(errorMsg);
	};

	return (
		<SafeAreaView style={{ flex: 1 }}>
			<StatusBar barStyle="dark-content" backgroundColor="#fff" />
			<Layout style={styles.wrapper}>
				<Image source={require("../assets/icon.png")} style={styles.appLogo} />
				<Layout style={styles.container}>
					<Text category="h3" style={styles.title}>
						SIGN UP
					</Text>
					<Input
						placeholder="Name"
						size="large"
						value={name}
						onChangeText={setName}
					/>
					<Input
						placeholder="Email"
						textContentType="emailAddress"
						size="large"
						value={email}
						onChangeText={(val) => setEmail(val.trim())}
					/>
					<Input
						placeholder="Password"
						textContentType="password"
						secureTextEntry
						size="large"
						value={password}
						onChangeText={setPassword}
					/>
					<Input
						placeholder="Confirm Password"
						textContentType="password"
						secureTextEntry
						size="large"
						value={confirmPassword}
						onChangeText={setConfirmPassword}
					/>
					<Button
						onPress={handleSubmit}
						children={() =>
							loading ? (
								<Spinner status="control" />
							) : (
								<Text appearance="alternative">SIGN UP</Text>
							)
						}
					/>
					<Text style={globalStyles.errorMsg}>{errorMsg}</Text>
					<Layout
						style={{
							display: "flex",
							flexDirection: "row",
							justifyContent: "space-between"
						}}
					>
						<Text style={globalStyles.text}>Already have an account?</Text>
						<Text
							style={globalStyles.link}
							onPress={() => navigation.navigate("Login")}
						>
							Login
						</Text>
					</Layout>
				</Layout>
			</Layout>
		</SafeAreaView>
	);
};
