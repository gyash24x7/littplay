import { Button, Card, Layout, Text } from "@ui-kitten/components";
import React, { useState } from "react";
import { Image, SafeAreaView } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { useHistory } from "react-router-dom";
import { generate } from "short-id";

import { CreateGame } from "../components/CreateGame";
import { JoinGame } from "../components/JoinGame";
import styles from "../styles";
import { User } from "../typings";
import firebase, { db } from "../utils/firebase";

export const HomeScreen = () => {
	const [visibleCreate, setVisibleCreate] = useState(false);
	const [visibleJoin, setVisibleJoin] = useState(false);
	const [gameId, setGameId] = useState("");
	const history = useHistory();

	const user: User = JSON.parse(localStorage.getItem("user")!);

	const logOut = async () => {
		await firebase.auth().signOut();
		localStorage.clear();
		history.push("/login");
	};

	const createGame = () => {
		const gameId: string = generate().toUpperCase();
		db.collection("games")
			.doc(gameId)
			.set({ started: false, completed: false })
			.then(() => {
				setGameId(gameId);
				setVisibleCreate(true);
			})
			.catch(err => {
				console.log("Some Error Occurred: ", err);
			});
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
					<Text style={styles.bottomText}>Logged in as {user.email}</Text>
				</Card>
				<CreateGame
					visible={visibleCreate}
					setVisible={setVisibleCreate}
					gameId={gameId}
				/>
				<JoinGame visible={visibleJoin} setVisible={setVisibleJoin} />
			</LinearGradient>
		</SafeAreaView>
	);
};
