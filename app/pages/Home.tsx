import { useNavigation } from "@react-navigation/native";
import React, { useContext, useState } from "react";
import { AsyncStorage, Image, useWindowDimensions, View } from "react-native";
import { Button, Paragraph } from "react-native-paper";

import { CreateGame } from "../components/CreateGame";
import { JoinGame } from "../components/JoinGame";
import styles from "../styles";
import { sortedDeck } from "../utils/constants";
import { UserContext } from "../utils/context";
import { removeCardsOfRank, shuffleCards } from "../utils/deck";
import firebase, { db } from "../utils/firebase";

export const HomeScreen = () => {
	const [visibleCreate, setVisibleCreate] = useState(false);
	const [visibleJoin, setVisibleJoin] = useState(false);
	const [gameId, setGameId] = useState("");
	const [loading, setLoading] = useState(false);
	const navigation = useNavigation();

	const { user } = useContext(UserContext);

	const logOut = async () => {
		await firebase.auth().signOut();
		await AsyncStorage.clear();
		navigation.navigate("Login");
	};

	const createGame = async () => {
		setLoading(true);
		const gameId = [...Array(6)]
			.map((_) => (~~(Math.random() * 36)).toString(36))
			.join("")
			.toUpperCase();

		const deck = shuffleCards(removeCardsOfRank("Seven", sortedDeck));

		await db
			.collection("games")
			.doc(gameId)
			.set({
				started: false,
				completed: false,
				currentMove: "",
				players: {},
				deck,
				teams: {},
				createdBy: user!.name
			})
			.catch((err) => {
				console.log("Some Error Occurred: ", err);
			});

		setGameId(gameId);
		setVisibleCreate(true);
		setLoading(false);
	};

	const { width, height } = useWindowDimensions();

	return (
		<View style={[styles.wrapper, { width, height }]}>
			<View />
			<View>
				<Image source={require("../assets/icon.png")} style={styles.logo} />
				<Button
					style={[styles.button]}
					mode="contained"
					compact
					onPress={createGame}
					loading={loading}
				>
					Create Game
				</Button>
				<Button
					style={styles.button}
					mode="contained"
					compact
					onPress={() => setVisibleJoin(true)}
				>
					Join Game
				</Button>
				<Button
					mode="contained"
					compact
					style={[styles.button, { backgroundColor: "#de350b" }]}
					onPress={logOut}
				>
					Logout
				</Button>
			</View>
			<Paragraph>Logged in as {user?.email}</Paragraph>
			<CreateGame
				visible={visibleCreate}
				setVisible={setVisibleCreate}
				gameId={gameId}
			/>
			<JoinGame visible={visibleJoin} setVisible={setVisibleJoin} />
		</View>
	);
};
