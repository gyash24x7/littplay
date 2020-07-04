import { IonButton, IonCard, IonCardContent, IonLoading } from "@ionic/react";
import React, { useContext } from "react";
import { useTransferChanceMutation } from "../generated";
import { GameContext } from "../utils/context";

export const TransferChance = () => {
	const game = useContext(GameContext)!;
	const [transferChance, { loading }] = useTransferChanceMutation({
		variables: { gameId: game._id }
	});

	return (
		<IonCard>
			<IonLoading isOpen={loading} />
			<IonCardContent>
				<IonButton className="app-button" onClick={() => transferChance()}>
					Transfer Chance
				</IonButton>
			</IonCardContent>
		</IonCard>
	);
};
