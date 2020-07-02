import { ActionSheetButton } from "@ionic/core";
import {
	IonActionSheet,
	IonButton,
	IonCard,
	IonCardContent,
	IonCardTitle,
	IonCol,
	IonLoading,
	IonRow
} from "@ionic/react";
import React, { useContext, useState } from "react";
import { GetGameQuery, useAskCardMutation } from "../generated";
import { UserContext } from "../utils/context";
import { GameCard, getHandRecord } from "../utils/deck";
import { ErrorMsg } from "./ErrorMsg";

interface AskCardProps {
	game: GetGameQuery["getGame"];
}

export const AskCard = ({ game }: AskCardProps) => {
	const { _id } = useContext(UserContext)!;
	const [actionSheetButtons, setActionSheetButtons] = useState<
		ActionSheetButton[]
	>([]);
	const [selectedSet, setSelectedSet] = useState("");
	const [selectedCard, setSelectedCard] = useState("");
	const [selectedPlayer, setSelectedPlayer] = useState("");
	const [errorMsg, setErrorMsg] = useState<string>();

	const mePlayer = game.players.find((player) => player._id === _id)!;

	const hand = mePlayer.hand.map((cardString) => new GameCard(cardString));
	const handRecord = getHandRecord(hand);

	const selectActionSheetOptions = (type: "SET" | "PLAYER" | "CARD") => () => {
		let btns: ActionSheetButton[] = [];

		switch (type) {
			case "CARD":
				btns = Array.from(handRecord[selectedSet]).map((card) => ({
					text: card,
					handler: () => setSelectedCard(card)
				}));
				break;

			case "SET":
				btns = Object.keys(handRecord).map((set) => ({
					text: set,
					handler: () => setSelectedSet(set)
				}));
				break;

			case "PLAYER":
				btns = game.players
					.filter(({ team }) => team !== mePlayer.team)
					.map(({ name, _id }) => ({
						text: name,
						handler: () => setSelectedPlayer(_id)
					}));
				break;
		}

		setActionSheetButtons(btns);
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
		<IonRow>
			<IonCol>
				<IonLoading isOpen={loading} />
				<IonCard className="game-play-card">
					<IonCardContent>
						<IonCardTitle>Ask Card</IonCardTitle>
						<br />
						<IonRow>
							<IonCol>
								<IonButton
									color="dark"
									className="app-button"
									onClick={selectActionSheetOptions("SET")}
								>
									Select Set
								</IonButton>
							</IonCol>
							<IonCol>
								<IonButton
									color="dark"
									className="app-button"
									onClick={selectActionSheetOptions("CARD")}
									disabled={!selectedSet}
								>
									Select Card
								</IonButton>
							</IonCol>
							<IonCol>
								<IonButton
									className="app-button"
									color="dark"
									onClick={selectActionSheetOptions("PLAYER")}
								>
									Select Player
								</IonButton>
							</IonCol>
						</IonRow>
						<IonRow style={{ justifyContent: "center" }}>
							<IonCol sizeSm="6" sizeMd="4">
								<IonButton onClick={() => askCard()} className="app-button">
									ASK
								</IonButton>
							</IonCol>
						</IonRow>
						{errorMsg && <ErrorMsg message={errorMsg} />}
					</IonCardContent>
				</IonCard>
				<IonActionSheet
					onDidDismiss={() => setActionSheetButtons([])}
					isOpen={actionSheetButtons.length !== 0}
					buttons={actionSheetButtons}
				></IonActionSheet>
			</IonCol>
		</IonRow>
	);
};
