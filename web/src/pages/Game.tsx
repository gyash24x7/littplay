import { Button, Card, Layout, Text } from "@ui-kitten/components";
import React, { useEffect, useState } from "react";
import LinearGradient from "react-native-linear-gradient";
import { useParams } from "react-router-dom";

import styles from "../styles";
import { Game, Player } from "../typings";
import { db } from "../utils/firebase";

export const GameScreen = () => {
	const { gameId } = useParams();
	const [players, setPlayers] = useState<Player[]>([]);
	const [gameData, setGameData] = useState<Game>();

	const startGame = () => {
		players.forEach(async (player, index) => {
			await db
				.collection("games")
				.doc(gameId)
				.collection("players")
				.doc(player.id)
				.update({ cards: gameData?.deck.slice(8 * index, 8 * index + 8) });
		});
	};

	useEffect(() => {
		const unsubscribeFromGame = db
			.collection("games")
			.doc(gameId)
			.onSnapshot(snapshot => {
				if (snapshot.exists) {
					setGameData(snapshot.data() as any);
				}
			});

		const unsubscribeFromPlayers = db
			.collection("games")
			.doc(gameId)
			.collection("players")
			.onSnapshot(snapshot => {
				if (!snapshot.empty) {
					const players = snapshot.docs.map(doc => {
						let data = doc.data();
						return { name: data.name, id: doc.id };
					});
					setPlayers(players);
				}
			});

		return () => {
			unsubscribeFromGame();
			unsubscribeFromPlayers();
		};
	}, [gameId]);

	return (
		<LinearGradient
			colors={["#c6ffdd", "#fbd786", "#f7797d"]}
			style={styles.wrapper}
		>
			<Card style={styles.card}>
				<Layout>
					{players.map(player => (
						<Text key={player.id}>{player.name} joined</Text>
					))}
				</Layout>
				{players.length === 2 && (
					<Button disabled={gameData?.started} onPress={startGame}>
						Start Game
					</Button>
				)}
			</Card>
		</LinearGradient>
	);
};
