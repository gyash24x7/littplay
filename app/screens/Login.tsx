import { useNavigation } from "@react-navigation/native";
import { Button, Input, Layout, Spinner, Text } from "@ui-kitten/components";
import React, { useContext, useState } from "react";
import { AsyncStorage, Image, StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLoginMutation } from "../generated";
import globalStyles from "../theme/globalStyles";
import styles from "../theme/loginStyles";
import { AuthContext } from "../utils/context";

const emailRegex = /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;

export const LoginScreen = () => {
	const [login, { loading }] = useLoginMutation({
		async onCompleted(data) {
			if (data.login) {
				await AsyncStorage.setItem("authToken", data.login);
				setIsAuthenticated(!!data.login);
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
	const [errorMsg, setErrorMsg] = useState<string>();
	const { setIsAuthenticated } = useContext(AuthContext)!;

	const validateFields = () => {
		switch (true) {
			case !email:
				return "Email is Required";
			case !emailRegex.test(email):
				return "Invalid Email!";
			case !password:
				return "Password is Required!";
			case password.length < 8:
				return "Password Length should be more than 8";
		}

		return;
	};

	const handleSubmit = () => {
		const errorMsg = validateFields();
		if (!errorMsg) {
			login({ variables: { email, password } });
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
						LOGIN
					</Text>
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
					<Button
						onPress={handleSubmit}
						children={() =>
							loading ? (
								<Spinner status="control" />
							) : (
								<Text appearance="alternative">LOGIN</Text>
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
						<Text style={globalStyles.text}>Don't have an account?</Text>
						<Text
							style={globalStyles.link}
							onPress={() => navigation.navigate("Signup")}
						>
							Sign Up
						</Text>
					</Layout>
				</Layout>
			</Layout>
		</SafeAreaView>
	);
};
