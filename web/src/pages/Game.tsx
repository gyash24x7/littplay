import { Button, Card, Layout, Text } from "@ui-kitten/components";
import React, { Fragment, useEffect, useState } from "react";
import { ActivityIndicator } from "react-native";
import { useParams } from "react-router-dom";

import { GameCardComponent } from "../components/GameCard";
import styles from "../styles";
import { Game, Player, User } from "../typings";
import { GameCard } from "../utils/deck";
import { db } from "../utils/firebase";

export const GameScreen = () => {
	const { gameId } = useParams();
	const [players, setPlayers] = useState<Player[]>([]);
	const [gameData, setGameData] = useState<Game>();
	const [loading, setLoading] = useState(false);
	const activePLayer: User = JSON.parse(localStorage.getItem("user")!);

	const startGame = async () => {
		setLoading(true);

		await db
			.collection("games")
			.doc(gameId)
			.update({ started: true });

		players.forEach(async (player, index) => {
			await db
				.collection("games")
				.doc(gameId)
				.collection("players")
				.doc(player.id)
				.update({ cards: gameData?.deck.slice(8 * index, 8 * index + 8) });
		});

		setLoading(false);
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
						return {
							name: data.name,
							id: doc.id,
							cards: data.cards?.map((cardString: string) =>
								GameCard.fromString(cardString)
							)
						};
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
		<Layout style={styles.wrapper}>
			{!gameData ? (
				<ActivityIndicator />
			) : (
				<Card style={styles.card}>
					{!gameData.started ? (
						<Fragment>
							{players.map(player => (
								<Text key={player.id}>{player.name} joined</Text>
							))}
							{players.length === 2 && (
								<Button disabled={loading} onPress={startGame}>
									{loading ? "Starting..." : "Start Game"}
								</Button>
							)}
						</Fragment>
					) : (
						<Layout style={styles.playingCardContainer}>
							{players.length > 0 &&
								players
									.find(player => player.id === activePLayer.email)!
									.cards?.map(card => <GameCardComponent card={card} />)}
						</Layout>
					)}
				</Card>
			)}
		</Layout>
	);
};
