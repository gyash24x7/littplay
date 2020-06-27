import {
	IonContent,
	IonGrid,
	IonLoading,
	IonPage,
	IonToast
} from "@ionic/react";
import React, { useState } from "react";
import { useParams } from "react-router";
import { NewGameCard } from "../components/NewGameCard";
import { PlayersCard } from "../components/PlayersCard";
import { GameStatus, useGetGameQuery } from "../generated";

export const GamePlayPage = () => {
	const [isToastVisible, setIsToastVisible] = useState(false);
	const { gameId } = useParams();
	const { data, loading } = useGetGameQuery({ variables: { gameId } });

	if (loading) return <IonLoading isOpen />;

	return (
		<IonPage>
			<IonContent>
				<IonGrid className="game-play-container">
					{data?.getGame.status === GameStatus.NotStarted && (
						<NewGameCard
							gameCode={data.getGame.gameCode}
							displayToast={() => setIsToastVisible(true)}
						/>
					)}
					{data?.getGame && <PlayersCard players={data.getGame.players} />}
				</IonGrid>
				<IonToast
					isOpen={isToastVisible}
					duration={1000}
					onDidDismiss={() => setIsToastVisible(false)}
					message="Game Code copied to clipboard!"
				/>
			</IonContent>
		</IonPage>
	);
};
