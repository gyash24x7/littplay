import {
	IonAvatar,
	IonButton,
	IonCardTitle,
	IonCol,
	IonIcon,
	IonLoading,
	IonText
} from "@ionic/react";
import { chevronBack, chevronForward } from "ionicons/icons";
import React, { Fragment, useContext, useState } from "react";
import { useAskCardMutation } from "../generated";
import { GameContext, UserContext } from "../utils/context";
import {
	GameCard,
	getAskableCardMap,
	getCardColor,
	getRank,
	getSuitIcon
} from "../utils/deck";
import { ErrorMsg } from "./ErrorMsg";

export const AskCard = () => {
	const { _id } = useContext(UserContext)!;
	const game = useContext(GameContext)!;

	const [selectedSet, setSelectedSet] = useState("");
	const [selectedCard, setSelectedCard] = useState("");
	const [selectedPlayer, setSelectedPlayer] = useState("");
	const [errorMsg, setErrorMsg] = useState<string>();
	const [panel, setPanel] = useState(0);

	const mePlayer = game.players.find((player) => player._id === _id)!;

	const myHand = mePlayer.hand.map((cardString) => new GameCard(cardString));
	const askableCardMap = getAskableCardMap(myHand);

	const handleSelect = (field: "player" | "set" | "card", id: string) => () => {
		document.querySelectorAll(".select-overlay").forEach((elem) => {
			elem.classList.remove("select-overlay");
		});

		document.getElementById(id)?.classList.add("select-overlay");

		switch (field) {
			case "player":
				setSelectedPlayer(id);
				break;
			case "card":
				setSelectedCard(id);
				break;
			case "set":
				setSelectedSet(id);
				break;
		}
	};

	const [askCard, { loading }] = useAskCardMutation({
		variables: {
			gameId: game._id,
			askedFor: selectedCard,
			askedFrom: selectedPlayer
		},
		onError: (err) => setErrorMsg(err.message)
	});

	return (
		<Fragment>
			<IonLoading isOpen={loading} />
			{panel === 0 && (
				<Fragment>
					<IonCardTitle>SELECT PLAYER</IonCardTitle>
					<br />
					<div className="flex-container">
						{game.players
							.filter(({ team, hand }) => team !== mePlayer.team && hand.length)
							.map(({ _id, name, hand, avatar }) => (
								<div onClick={handleSelect("player", _id)} key={_id} id={_id}>
									<IonAvatar slot="start">
										<img src={avatar} alt="" />
									</IonAvatar>
									<div className="user-details">
										<div>{name}</div>
										<div>({hand.length} cards left)</div>
									</div>
								</div>
							))}
					</div>
				</Fragment>
			)}
			{panel === 1 && (
				<Fragment>
					<IonCardTitle>SELECT SET</IonCardTitle>
					<br />
					<div className="flex-container">
						{Object.keys(askableCardMap).map((set) => (
							<div key={set} id={set} onClick={handleSelect("set", set)}>
								{set}
							</div>
						))}
					</div>
				</Fragment>
			)}
			{panel === 2 && (
				<Fragment>
					<IonCardTitle>SELECT CARD</IonCardTitle>
					<br />
					<div className="flex-container">
						{askableCardMap[selectedSet]
							.map((cardString) => new GameCard(cardString))
							.map((gameCard) => (
								<div
									className="game-card"
									key={gameCard.getCardString()}
									id={gameCard.getCardString()}
									onClick={handleSelect("card", gameCard.getCardString())}
								>
									<img
										src={getSuitIcon(gameCard)}
										alt=""
										className="card-suit"
									/>
									<div
										className="card-rank"
										style={{ color: getCardColor(gameCard) }}
									>
										{getRank(gameCard)}
									</div>
								</div>
							))}
					</div>
				</Fragment>
			)}
			{panel === 3 && (
				<Fragment>
					<IonText>
						ASK&nbsp;&nbsp;{selectedCard}&nbsp;&nbsp;FROM&nbsp;&nbsp;
						{game.players
							.find(({ _id }) => _id === selectedPlayer)
							?.name.toUpperCase()}
					</IonText>
					<br />
					<IonButton onClick={() => askCard()} className="app-button">
						ASK
					</IonButton>
					{errorMsg && <ErrorMsg message={errorMsg} />}
				</Fragment>
			)}
			<br />
			<div className="flex-container">
				<IonCol>
					{panel !== 0 && (
						<IonButton
							className="montserrat"
							expand="block"
							color="dark"
							onClick={() => setPanel(panel - 1)}
						>
							<IonIcon icon={chevronBack} />
							<span>PREV</span>
						</IonButton>
					)}
				</IonCol>
				<IonCol>
					{panel !== 3 && (
						<IonButton
							className="montserrat"
							color="dark"
							expand="block"
							disabled={
								(panel === 0 && !selectedPlayer) ||
								(panel === 1 && !selectedSet) ||
								(panel === 2 && !selectedCard)
							}
							onClick={() => setPanel(panel + 1)}
						>
							<span>NEXT</span>
							<IonIcon icon={chevronForward} />
						</IonButton>
					)}
				</IonCol>
			</div>
		</Fragment>
	);
};
