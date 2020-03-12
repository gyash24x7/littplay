import { Button, Card, Layout } from "@ui-kitten/components";
import React, { useState } from "react";
import { Image, SafeAreaView } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { useHistory } from "react-router-dom";
import { generate } from "short-id";

import { CreateGame } from "../components/CreateGame";
import { JoinGame } from "../components/JoinGame";
import { appState } from "../store";
import styles from "../styles";
import firebase, { db } from "../utils/firebase";

export const HomeScreen = () => {
	const [visibleCreate, setVisibleCreate] = useState(false);
	const [visibleJoin, setVisibleJoin] = useState(false);
	const history = useHistory();

	const logOut = async () => {
		await firebase.auth().signOut();
		localStorage.clear();
		appState.loggedIn = false;
		appState.user = null;
		history.push("/login");
	};

	const createGame = () => {
		const gameId = generate();
		db.collection("games")
			.doc(gameId)
			.set({});
		setVisibleCreate(true);
	};

	return (
		<SafeAreaView style={{ height: "100%" }}>
			<LinearGradient
				colors={["#c6ffdd", "#fbd786", "#f7797d"]}
				style={styles.wrapper}
			>
				<Card style={styles.card}>
					<Image
						source={{ uri: require("../assets/icon.png") }}
						style={styles.logo}
					/>
					<Layout>
						<Button style={styles.button} onPress={createGame}>
							Create Game
						</Button>
						<Button style={styles.button} onPress={() => setVisibleJoin(true)}>
							Join a Game
						</Button>
						<Button style={styles.button} status="danger" onPress={logOut}>
							Logout
						</Button>
					</Layout>
				</Card>
				<CreateGame visible={visibleCreate} setVisible={setVisibleCreate} />
				<JoinGame visible={visibleJoin} setVisible={setVisibleJoin} />
			</LinearGradient>
		</SafeAreaView>
	);
};
