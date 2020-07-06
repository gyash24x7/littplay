import {
	IonButton,
	IonCard,
	IonCardContent,
	IonCol,
	IonRow
} from "@ionic/react";
import React, { useState } from "react";
import { AppModal } from "./AppModal";
import { AskCard } from "./AskCard";
import { CallSet } from "./CallSet";

export const TurnSegment = () => {
	const [activeModal, setActiveModal] = useState<"ASK CARD" | "CALL SET">();

	return (
		<IonCard className="game-play-card">
			<IonCardContent>
				<IonRow>
					<IonCol>
						<IonButton
							className="app-button small"
							onClick={() => setActiveModal("ASK CARD")}
						>
							ASK CARD
						</IonButton>
					</IonCol>
					<IonCol>
						<IonButton
							className="app-button small"
							onClick={() => setActiveModal("CALL SET")}
						>
							CALL SET
						</IonButton>
					</IonCol>
				</IonRow>
				{activeModal && (
					<AppModal
						header={activeModal}
						onClose={() => setActiveModal(undefined)}
					>
						{activeModal === "ASK CARD" ? (
							<AskCard />
						) : (
							<CallSet closeModal={() => setActiveModal(undefined)} />
						)}
					</AppModal>
				)}
			</IonCardContent>
		</IonCard>
	);
};
