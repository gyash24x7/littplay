import Button from "@atlaskit/button";
import React, { Fragment, useState } from "react";
import { useHistory } from "react-router-dom";

import Logo from "../assets/icon.png";
import { CreateGame } from "../components/CreateGame";
import { JoinGame } from "../components/JoinGame";
import { Player } from "../typings";
import { Deck, GameCard } from "../utils/deck";
import firebase, { db } from "../utils/firebase";

export const HomeScreen = () => {
	const [visibleCreate, setVisibleCreate] = useState(false);
	const [visibleJoin, setVisibleJoin] = useState(false);
	const [gameId, setGameId] = useState("");
	const [loading, setLoading] = useState(false);
	const history = useHistory();

	const user: Player = JSON.parse(localStorage.getItem("user")!);

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
		deck.removeCardsOfRank("Seven");

		await db
			.collection("games")
			.doc(gameId)
			.set({
				started: false,
				completed: false,
				currentMove: "",
				players: [],
				createdBy: user.email,
				deck: deck.cards.map(GameCard.toMap),
				teams: []
			})
			.catch(err => {
				console.log("Some Error Occurred: ", err);
			});

		setGameId(gameId);
		setVisibleCreate(true);
		setLoading(false);
	};

	return (
		<Fragment>
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
					<h4 className="paragraph">Logged in as {user.email}</h4>
				</div>
			</div>

			<CreateGame
				visible={visibleCreate}
				setVisible={setVisibleCreate}
				gameId={gameId}
			/>
			<JoinGame visible={visibleJoin} setVisible={setVisibleJoin} />
		</Fragment>
	);
};
