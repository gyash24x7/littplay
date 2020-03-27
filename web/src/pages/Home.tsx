import { Button, Card, Layout, Text } from "@ui-kitten/components";
import React, { useState } from "react";
import { Image } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { useHistory } from "react-router-dom";

import { CreateGame } from "../components/CreateGame";
import { JoinGame } from "../components/JoinGame";
import styles from "../styles";
import { User } from "../typings";
import { Deck } from "../utils/deck";
import firebase, { db } from "../utils/firebase";

export const HomeScreen = () => {
	const [visibleCreate, setVisibleCreate] = useState(false);
	const [visibleJoin, setVisibleJoin] = useState(false);
	const [gameId, setGameId] = useState("");
	const [loading, setLoading] = useState(false);
	const history = useHistory();

	const user: User = JSON.parse(localStorage.getItem("user")!);

	const logOut = async () => {
		await firebase.auth().signOut();
		localStorage.clear();
		history.push("/login");
	};

	const createGame = async () => {
		setLoading(true);
		const gameId = [...Array(6)]
			.map(_ => (~~(Math.random() * 36)).toString(36))
			.join("")
			.toUpperCase();

		const deck = new Deck();

		await db
			.collection("games")
			.doc(gameId)
			.set({
				started: false,
				completed: false,
				deck: deck.cards.map(card => card.toString())
			})
			.catch(err => {
				console.log("Some Error Occurred: ", err);
			});

		setGameId(gameId);
		setVisibleCreate(true);
		setLoading(false);
	};

	return (
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
					<Button style={styles.button} onPress={createGame} disabled={loading}>
						{loading ? "Loading..." : "Create Game"}
					</Button>
					<Button style={styles.button} onPress={() => setVisibleJoin(true)}>
						Join a Game
					</Button>
					<Button style={styles.button} status="danger" onPress={logOut}>
						Logout
					</Button>
				</Layout>
			</Card>
			<Text style={styles.bottomText}>Logged in as {user.email}</Text>
			<CreateGame
				visible={visibleCreate}
				setVisible={setVisibleCreate}
				gameId={gameId}
			/>
			<JoinGame visible={visibleJoin} setVisible={setVisibleJoin} />
		</LinearGradient>
	);
};
