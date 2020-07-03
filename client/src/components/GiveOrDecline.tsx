import {
	IonButton,
	IonCard,
	IonCardContent,
	IonCol,
	IonLoading,
	IonRow
} from "@ionic/react";
import React, { useContext, useState } from "react";
import { useDeclineCardMutation, useGiveCardMutation } from "../generated";
import { GameContext, UserContext } from "../utils/context";
import { ErrorMsg } from "./ErrorMsg";

export const GiveOrDecline = () => {
	const user = useContext(UserContext)!;
	const game = useContext(GameContext)!;
	const { hand } = game.players.find(({ _id }) => _id === user._id)!;
	const [errorMsg, setErrorMsg] = useState<string>();

	const hasCard =
		hand.findIndex((card) => card === game.currentMove!.askedFor!) > -1;

	const [giveCard, { loading: giveLoading }] = useGiveCardMutation({
		variables: {
			gameId: game._id,
			cardToGive: game.currentMove!.askedFor!,
			giveTo: game.currentMove!.askedBy!
		},
		onError(err) {
			console.log(err);
			setErrorMsg(err.message);
		}
	});

	const [declineCard, { loading: declineLoading }] = useDeclineCardMutation({
		variables: { gameId: game._id, cardDeclined: game.currentMove!.askedFor! },
		onError(err) {
			console.log(err);
			setErrorMsg(err.message);
		}
	});

	return (
		<IonCard>
			<IonCardContent>
				<IonRow style={{ justifyContent: "center" }}>
					{hasCard ? (
						<IonCol>
							<IonButton className="app-button" onClick={() => giveCard()}>
								GIVE CARD
							</IonButton>
						</IonCol>
					) : (
						<IonCol>
							<IonButton className="app-button" onClick={() => declineCard()}>
								DECLINE CARD
							</IonButton>
						</IonCol>
					)}
				</IonRow>
				{errorMsg && <ErrorMsg message={errorMsg} />}
				<IonLoading isOpen={giveLoading || declineLoading} />
			</IonCardContent>
		</IonCard>
	);
};
