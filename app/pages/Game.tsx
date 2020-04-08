import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { useParams } from "react-router-dom";

import { Game, User } from "../typings";
import { db } from "../utils/firebase";

export const GameScreen = () => {
	const { gameId } = useParams();
	const [gameData, setGameData] = useState<Game>();
	const [visible, setVisible] = useState(false);
	const [loading, setLoading] = useState(false);
	const user: User = JSON.parse(localStorage.getItem("user")!);

	const startGame = async () => {
		setLoading(true);

		let gameUpdate: any = {};

		Object.keys(gameData!.players).forEach((name, index) => {
			gameUpdate[`players.${name}`] = gameData?.deck.slice(
				index * 24,
				(index + 1) * 24
			);
		});

		await db
			.collection("games")
			.doc(gameId)
			.update({
				...gameUpdate,
				started: true,
				currentMove: "TURN",
				turn: user.name
			});

		setLoading(false);
	};

	useEffect(() => {
		const unsubscribeFromGame = db
			.collection("games")
			.doc(gameId)
			.onSnapshot((snapshot) => {
				if (snapshot.exists) {
					setGameData(snapshot.data() as any);
				}
			});

		return () => unsubscribeFromGame();
	}, [gameId]);

	// return (
	// 	<View className="wrapper">
	// 		<View className="logo-mark">
	// 			<img src={Logo} alt="" />
	// 		</View>
	// 		{!gameData && <Spinner />}
	// 		{gameData && !gameData.started && (
	// 			<View className="card">
	// 				{Object.keys(gameData.players).map((name) => (
	// 					<View className="flag-wrapper" key={name}>
	// 						<Flag
	// 							appearance="success"
	// 							title={name + " JOINED"}
	// 							isDismissAllowed={false}
	// 							id={name}
	// 							icon={
	// 								<TickIcon label="Check Icon" secondaryColor={colors.G400} />
	// 							}
	// 						/>
	// 					</View>
	// 				))}
	// 				{Object.keys(gameData.players).length === 2 &&
	// 					Object.keys(gameData.teams).length === 0 &&
	// 					gameData.createdBy === user.name && (
	// 						<Button
	// 							appearance="primary"
	// 							className="button"
	// 							onClick={() => setVisible(true)}
	// 						>
	// 							Create Teams
	// 						</Button>
	// 					)}
	// 				{Object.keys(gameData.players).length === 2 &&
	// 					Object.keys(gameData.teams).length > 0 &&
	// 					gameData.createdBy === user.name && (
	// 						<Button
	// 							appearance="primary"
	// 							className="button"
	// 							isDisabled={loading}
	// 							onClick={startGame}
	// 							isLoading={loading}
	// 						>
	// 							Start Game
	// 						</Button>
	// 					)}
	// 			</View>
	// 		)}
	// 		{gameData && gameData.started && (
	// 			<Fragment>
	// 				<View className="playing-card-container">
	// 					{getSortedHand(gameData.players[user.name]).map((card) => (
	// 						<GameCardComponent card={card} key={card.rank + card.suit} />
	// 					))}
	// 				</View>
	// 				<GamePlay gameData={gameData} />
	// 			</Fragment>
	// 		)}
	// 		<h4 className="paragraph">Logged in as {user.email}</h4>
	// 		<CreateTeams
	// 			visible={visible}
	// 			setVisible={setVisible}
	// 			players={Object.keys(gameData?.players || {})}
	// 		/>
	// 	</View>
	// );

	return (
		<View>
			<Text>Gamescreen</Text>
		</View>
	);
};
