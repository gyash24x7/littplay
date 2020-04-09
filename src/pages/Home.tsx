import Button from "@atlaskit/button";
import { IonPage } from "@ionic/react";
import React, { useContext, useState } from "react";

import Logo from "../assets/icon.png";
import { CreateGame } from "../components/CreateGame";
import { JoinGame } from "../components/JoinGame";
import { sortedDeck } from "../utils/constants";
import { UserContext } from "../utils/context";
import { removeCardsOfRank, shuffleCards } from "../utils/deck";
import firebase, { db } from "../utils/firebase";

export const HomeScreen = () => {
	const [visibleCreate, setVisibleCreate] = useState(false);
	const [visibleJoin, setVisibleJoin] = useState(false);
	const [gameId, setGameId] = useState("");
	const [loading, setLoading] = useState(false);

	const { user, setUser } = useContext(UserContext);

	const logOut = async () => {
		await firebase.auth().signOut();
		localStorage.clear();
		setUser({});
		window.location.pathname = "/login";
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
				createdBy: user.name
			})
			.catch((err) => {
				console.log("Some Error Occurred: ", err);
			});

		setGameId(gameId);
		setVisibleCreate(true);
		setLoading(false);
	};

	return (
		<IonPage>
			<div
				className="wrapper"
				style={{
					justifyContent: "center",
					marginBottom: "10vh",
					minHeight: "90vh"
				}}
			>
				<div className="card">
					<img src={Logo} alt="" className="logo" />
					<Button
						className="button"
						onClick={createGame}
						isDisabled={loading}
						isLoading={loading}
						appearance="primary"
					>
						Create Game
					</Button>
					<Button
						className="button"
						onClick={() => setVisibleJoin(true)}
						appearance="primary"
					>
						Join a Game
					</Button>
					<Button className="button" appearance="danger" onClick={logOut}>
						Logout
					</Button>
					<h4 className="paragraph">Logged in as {user?.email}</h4>
				</div>
			</div>

			<CreateGame
				visible={visibleCreate}
				setVisible={setVisibleCreate}
				gameId={gameId}
			/>
			<JoinGame visible={visibleJoin} setVisible={setVisibleJoin} />
		</IonPage>
	);
};
