import { IonCard, IonCardContent, IonCol, IonRow } from "@ionic/react";
import React from "react";
import { GetGameQuery } from "../generated";
import { Banner } from "./Banner";

interface PreviousMovesProps {
	lastMove: GetGameQuery["getGame"]["lastMove"];
	currentMove: GetGameQuery["getGame"]["currentMove"];
}

export const PreviousMoves = ({
	currentMove,
	lastMove
}: PreviousMovesProps) => {
	return (
		<IonRow>
			<IonCol>
				<IonCard className="game-play-card">
					<IonCardContent className="moves-container">
						<Banner content={currentMove?.description} color="danger" />
						<Banner content={lastMove?.description} color="success" />
					</IonCardContent>
				</IonCard>
			</IonCol>
		</IonRow>
	);
};
