import { useNavigation } from "@react-navigation/native";
import * as Google from "expo-google-app-auth";
import React, { useContext, useState } from "react";
import {
  AsyncStorage,
  Image,
  TextInput,
  useWindowDimensions,
  View,
} from "react-native";
import { Button, Caption } from "react-native-paper";

import { rnFirebaseConfig as config } from "../environment";
import styles from "../styles";
import { User } from "../typings";
import { UserContext } from "../utils/context";

export const LoginScreen = () => {
	const [loading, setLoading] = useState(false);
	const [name, setName] = useState("");
	const navigation = useNavigation();
	const { setUser } = useContext(UserContext);

	const login = async () => {
		setLoading(true);

		const result = await Google.logInAsync(config);

		if (result.type === "success") {
			const user: User = { name, email: result.user.email! };

			AsyncStorage.setItem("user", JSON.stringify(user)).then(() => {
				setLoading(false);
				setUser(user);
				navigation.navigate("Home");
			});
		}
	};

	const { width, height } = useWindowDimensions();

	return (
		<View
			style={[
				styles.wrapper,
				{ width, height, justifyContent: "center", paddingBottom: 0.1 * height }
			]}
		>
			<Image source={require("../assets/icon.png")} style={styles.logo} />
			<View style={{ width: width * 0.8 }}>
				<TextInput
					style={styles.input}
					onChangeText={(val) => setName(val)}
					placeholder="ENTER NAME"
					autoCapitalize="characters"
				/>
				<Caption style={{ textAlign: "center", marginBottom: 10 }}>
					Use UpperCase Characters only
				</Caption>
				<Button
					style={styles.button}
					mode="contained"
					compact
					loading={loading}
					onPress={login}
					disabled={!name}
				>
					Login with Google
				</Button>
			</View>
		</View>
	);

	// return (
	// 	<View className="wrapper" style={{ justifyContent: "center" }}>
	// 		<View className="card" style={{ marginBottom: "10vh" }}>
	// 			<img src={Logo} alt="" className="logo" />
	// 			<View className="input-wrapper">
	// 				<Textfield
	// 					appearance="none"
	// 					value={name}
	// 					isDisabled={loading}
	// 					onChange={(e: any) => {
	// 						e.persist();
	// 						setName(e.target.value.toUpperCase());
	// 					}}
	// 					className="input"
	// 					placeholder="ENTER NAME"
	// 				/>
	// 			</View>
	// 			<Button
	// 				onClick={login}
	// 				isDisabled={loading || !name}
	// 				isLoading={loading}
	// 				appearance="primary"
	// 				className="button"
	// 			>
	// 				Log in with Google
	// 			</Button>
	// 		</View>
	// 	</View>
	// );
};
