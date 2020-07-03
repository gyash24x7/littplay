import {
	IonCard,
	IonCardContent,
	IonSegment,
	IonSegmentButton
} from "@ionic/react";
import React, { useState } from "react";
import { AskCard } from "./AskCard";
import { CallSet } from "./CallSet";

export const TurnSegment = () => {
	const [activeSegment, setActiveSegment] = useState("ASK");

	return (
		<IonCard className="game-play-card">
			<IonCardContent>
				<IonSegment
					onIonChange={(e) => setActiveSegment(e.detail.value!)}
					value={activeSegment}
				>
					<IonSegmentButton value="ASK">ASK CARD</IonSegmentButton>
					<IonSegmentButton value="CALL">CALL SET</IonSegmentButton>
				</IonSegment>
				<br />
				{activeSegment === "ASK" && <AskCard />}
				{activeSegment === "CALL" && <CallSet />}
			</IonCardContent>
		</IonCard>
	);
};
