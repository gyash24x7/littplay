import { Button, Card, Layout, Text } from "@ui-kitten/components";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { useParams } from "react-router-dom";

import styles from "../styles";
import { db } from "../utils/firebase";

export const GameScreen = () => {
	const { gameId } = useParams();
	const [players, setPlayers] = useState<any[]>([]);

	useEffect(() => {
		const unsubscribeFromGame = db
			.collection("games")
			.doc(gameId)
			.onSnapshot(snapshot => {
				if (snapshot.exists) {
					console.log(snapshot.data());
				}
			});

		const unsubscribeFromPlayers = db
			.collection("games")
			.doc(gameId)
			.collection("players")
			.onSnapshot(snapshot => {
				if (!snapshot.empty) {
					setPlayers(
						snapshot.docs.map(doc => ({ data: doc.data(), id: doc.id }))
					);
				}
			});
		return () => {
			unsubscribeFromGame();
			unsubscribeFromPlayers();
		};
	}, []);

	return (
		<SafeAreaView style={{ height: "100%" }}>
			<LinearGradient
				colors={["#c6ffdd", "#fbd786", "#f7797d"]}
				style={styles.wrapper}
			>
				<Card style={styles.card}>
					<Layout>
						{players.map(player => (
							<Text key={player.id}>{player.data.name} joined</Text>
						))}
					</Layout>
					{players.length === 1 && <Button>Start Game</Button>}
				</Card>
			</LinearGradient>
		</SafeAreaView>
	);
};
