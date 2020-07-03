import {
	IonButton,
	IonCard,
	IonCardContent,
	IonCol,
	IonLoading,
	IonRow
} from "@ionic/react";
import React, { useContext, useState } from "react";
import {
	GetGameQuery,
	useDeclineCardMutation,
	useGiveCardMutation
} from "../generated";
import { UserContext } from "../utils/context";
import { ErrorMsg } from "./ErrorMsg";

interface GiveOrDeclineProps {
	game: GetGameQuery["getGame"];
}

export const GiveOrDecline = ({ game }: GiveOrDeclineProps) => {
	const user = useContext(UserContext)!;
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
		<IonRow>
			<IonCol>
				<IonLoading isOpen={giveLoading || declineLoading} />
				<IonCard>
					<IonCardContent>
						<IonRow style={{ justifyContent: "center" }}>
							{hasCard ? (
								<IonCol sizeLg="3" sizeMd="4" sizeSm="6" size="12">
									<IonButton className="app-button" onClick={() => giveCard()}>
										GIVE CARD
									</IonButton>
								</IonCol>
							) : (
								<IonCol sizeLg="3" sizeMd="4" sizeSm="6" size="12">
									<IonButton
										className="app-button"
										onClick={() => declineCard()}
									>
										DECLINE CARD
									</IonButton>
								</IonCol>
							)}
						</IonRow>
						{errorMsg && <ErrorMsg message={errorMsg} />}
					</IonCardContent>
				</IonCard>
			</IonCol>
		</IonRow>
	);
};
