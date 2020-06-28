import {
	IonCol,
	IonContent,
	IonGrid,
	IonLoading,
	IonPage,
	IonRow,
	IonToast
} from "@ionic/react";
import React, { useState } from "react";
import { useParams } from "react-router";
import { NewGameCard } from "../components/NewGameCard";
import { PlayersCard } from "../components/PlayersCard";
import { GameStatus, useGetGameQuery } from "../generated";

export const GamePage = () => {
	const [isToastVisible, setIsToastVisible] = useState(false);
	const { gameId } = useParams();
	const { data, loading } = useGetGameQuery({ variables: { gameId } });

	if (loading) return <IonLoading isOpen />;

	return (
		<IonPage>
			<IonContent>
				<IonGrid className="game-play-container">
					<IonRow>
						<IonCol>
							{data?.getGame.status === GameStatus.NotStarted && (
								<NewGameCard
									gameCode={data.getGame.code}
									displayToast={() => setIsToastVisible(true)}
								/>
							)}
						</IonCol>
					</IonRow>
					<IonRow>
						<IonCol>
							{data?.getGame && (
								<PlayersCard
									players={data.getGame.players}
									gameCode={data.getGame.code}
								/>
							)}
						</IonCol>
					</IonRow>
				</IonGrid>
				<IonToast
					isOpen={isToastVisible}
					duration={1000}
					onDidDismiss={() => setIsToastVisible(false)}
					message="Code copied to clipboard!"
				/>
			</IonContent>
		</IonPage>
	);
};
