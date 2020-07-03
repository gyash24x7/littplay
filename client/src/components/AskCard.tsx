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

	const hand = mePlayer.hand.map((cardString) => new GameCard(cardString));
	const askableCardMap = getAskableCardMap(hand);

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
					<IonLabel>Select Set</IonLabel>
					<IonSelect
						className="app-select"
						onIonChange={(e) => setSelectedSet(e.detail.value)}
						value={selectedSet}
						interface="action-sheet"
						interfaceOptions={{ header: "SELECT SET" }}
					>
						{Object.keys(askableCardMap).map((set) => (
							<IonSelectOption value={set} key={set}>
								{set}
							</IonSelectOption>
						))}
					</IonSelect>
				</IonItem>
				{selectedSet && (
					<IonItem>
						<IonLabel>Select Card</IonLabel>
						<IonSelect
							className="app-select"
							onIonChange={(e) => setSelectedCard(e.detail.value)}
							value={selectedCard}
							interface="action-sheet"
							interfaceOptions={{ header: "SELECT SET" }}
						>
							{askableCardMap[selectedSet].map((card) => (
								<IonSelectOption value={card} key={card}>
									{card}
								</IonSelectOption>
							))}
						</IonSelect>
					</IonItem>
				)}
				{selectedSet && selectedCard && (
					<IonItem>
						<IonLabel>Select Player</IonLabel>
						<IonSelect
							className="app-select"
							onIonChange={(e) => setSelectedPlayer(e.detail.value)}
							value={selectedPlayer}
							interface="action-sheet"
							interfaceOptions={{ header: "SELECT SET" }}
						>
							{game.players
								.filter(({ team }) => team !== mePlayer.team)
								.map(({ _id, name }) => (
									<IonSelectOption value={_id} key={_id}>
										{name}
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
