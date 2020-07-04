import {
	IonButton,
	IonItem,
	IonLabel,
	IonList,
	IonLoading,
	IonSelect,
	IonSelectOption
} from "@ionic/react";
import React, { Fragment, useContext, useState } from "react";
import { useAskCardMutation } from "../generated";
import { GameContext, UserContext } from "../utils/context";
import { GameCard, getAskableCardMap } from "../utils/deck";
import { ErrorMsg } from "./ErrorMsg";

export const AskCard = () => {
	const { _id } = useContext(UserContext)!;
	const game = useContext(GameContext)!;

	const [selectedSet, setSelectedSet] = useState("");
	const [selectedCard, setSelectedCard] = useState("");
	const [selectedPlayer, setSelectedPlayer] = useState("");
	const [errorMsg, setErrorMsg] = useState<string>();

	const mePlayer = game.players.find((player) => player._id === _id)!;

	const myHand = mePlayer.hand.map((cardString) => new GameCard(cardString));
	const askableCardMap = getAskableCardMap(myHand);

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
			<IonList>
				<IonItem>
					<IonLabel className="app-select-label" color="dark">
						Select Player
					</IonLabel>
					<IonSelect
						className="app-select"
						onIonChange={(e) => setSelectedPlayer(e.detail.value)}
						value={selectedPlayer}
						interfaceOptions={{
							header: "Select Player",
							cssClass: "select-alert"
						}}
						disabled={
							game.players.filter(
								({ team, hand }) => team !== mePlayer.team && hand.length
							).length === 0
						}
					>
						{game.players
							.filter(({ team, hand }) => team !== mePlayer.team && hand.length)
							.map(({ _id, name, hand }) => (
								<IonSelectOption value={_id} key={_id}>
									{name} ({hand.length} cards left)
								</IonSelectOption>
							))}
					</IonSelect>
				</IonItem>
				{selectedSet && (
					<IonItem>
						<IonLabel className="app-select-label" color="dark">
							Select Set
						</IonLabel>
						<IonSelect
							className="app-select"
							color="dark"
							onIonChange={(e) => setSelectedSet(e.detail.value)}
							value={selectedSet}
							interfaceOptions={{
								header: "Select Set",
								cssClass: "select-alert"
							}}
						>
							{Object.keys(askableCardMap).map((set) => (
								<IonSelectOption value={set} key={set}>
									{set}
								</IonSelectOption>
							))}
						</IonSelect>
					</IonItem>
				)}
				{selectedSet && selectedPlayer && (
					<IonItem>
						<IonLabel className="app-select-label" color="dark">
							Select Card
						</IonLabel>
						<IonSelect
							className="app-select"
							onIonChange={(e) => setSelectedCard(e.detail.value)}
							value={selectedCard}
							interfaceOptions={{
								header: "SELECT CARD",
								cssClass: "select-alert"
							}}
						>
							{askableCardMap[selectedSet].map((card) => (
								<IonSelectOption value={card} key={card}>
									{card}
								</IonSelectOption>
							))}
						</IonSelect>
					</IonItem>
				)}
				{selectedCard && selectedPlayer && selectedSet && (
					<IonButton onClick={() => askCard()} className="app-button">
						ASK
					</IonButton>
				)}
			</IonList>

			{errorMsg && <ErrorMsg message={errorMsg} />}
		</Fragment>
	);
};
