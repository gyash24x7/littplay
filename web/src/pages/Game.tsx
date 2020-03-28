import { Button, Card, Layout, Text } from "@ui-kitten/components";
import React, { Fragment, useEffect, useState } from "react";
import { ActivityIndicator } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { useParams } from "react-router-dom";

import { GameCardComponent } from "../components/GameCard";
import styles from "../styles";
import { Game, Player } from "../typings";
import { GameCard } from "../utils/deck";
import { db } from "../utils/firebase";

export const GameScreen = () => {
	const { gameId } = useParams();
	const [players, setPlayers] = useState<Player[]>([]);
	const [gameData, setGameData] = useState<Game>();
	const [loading, setLoading] = useState(true);

	const startGame = () => {
		setLoading(true);

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
						console.log(data);
						return {
							name: data.name,
							id: doc.id,
							cards: data.cards.map((cardString: string) =>
								GameCard.fromString(cardString)
							)
						};
					});
					console.log(players);
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
			{!gameData ? (
				<ActivityIndicator />
			) : (
				<Card style={styles.card}>
					{!gameData.started && (
						<Fragment>
							<Layout>
								{players.map(player => (
									<Text key={player.id}>{player.name} joined</Text>
								))}
							</Layout>
							{players.length === 1 && (
								<Button disabled={loading} onPress={startGame}>
									{loading ? "Starting..." : "Start Game"}
								</Button>
							)}
						</Fragment>
					)}
					<Layout style={styles.playingCardContainer}>
						{players.length > 0 &&
							players[0].cards?.map(card => <GameCardComponent card={card} />)}
					</Layout>
				</Card>
			)}
		</LinearGradient>
	);
};
