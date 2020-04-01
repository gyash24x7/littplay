import { Button, Card, Layout, Text } from "@ui-kitten/components";
import React, { Fragment, useEffect, useState } from "react";
import { ActivityIndicator, Image } from "react-native";
import { useParams } from "react-router-dom";

import { GameCardComponent } from "../components/GameCard";
import { GamePlay } from "../components/GamePlay";
import styles from "../styles";
import { Game, Player, User } from "../typings";
import { GameCard } from "../utils/deck";
import { db } from "../utils/firebase";

export const GameScreen = () => {
	const { gameId } = useParams();
	const [players, setPlayers] = useState<Player[]>([]);
	const [gameData, setGameData] = useState<Game>();
	const [loading, setLoading] = useState(false);
	const user: User = JSON.parse(localStorage.getItem("user")!);

	const activePlayer =
		players.length > 0
			? players.find(player => player.id === user.email)
			: undefined;

	const startGame = async () => {
		setLoading(true);

		await db
			.collection("games")
			.doc(gameId)
			.update({
				started: true,
				currentMove: { type: "TURN", turn: user.displayName }
			});

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
							cards: data.cards as GameCard[]
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
			<Layout>
				<Image source={require("../assets/icon.png")} style={styles.logoMark} />
				{!gameData && <ActivityIndicator />}
			</Layout>
			{gameData && !gameData.started && (
				<Card style={styles.card}>
					{players.map(player => (
						<Text key={player.id}>{player.name} joined</Text>
					))}
					{players.length === 6 && (
						<Button disabled={loading} onPress={startGame}>
							{loading ? "Starting..." : "Start Game"}
						</Button>
					)}
				</Card>
			)}
			{gameData && gameData.started && (
				<Fragment>
					<Layout style={styles.playingCardContainer}>
						{activePlayer?.cards?.map(card => (
							<GameCardComponent card={card} />
						))}
					</Layout>
					<GamePlay
						gameData={gameData}
						players={players}
						activePlayer={activePlayer}
					/>
				</Fragment>
			)}

			<Text style={styles.bottomText}>Logged in as {user.email}</Text>
		</Layout>
	);
};
