import {
	IonCol,
	IonContent,
	IonGrid,
	IonLoading,
	IonPage,
	IonRow,
	IonToast
} from "@ionic/react";
import React, { useContext, useState } from "react";
import { Redirect, useParams } from "react-router";
import { ErrorMsg } from "../components/ErrorMsg";
import { NewGameCard } from "../components/NewGameCard";
import { PlayersCard } from "../components/PlayersCard";
import { GameStatus, useGetGameQuery } from "../generated";
import { UserContext } from "../utils/context";

export const GamePage = () => {
	const [isToastVisible, setIsToastVisible] = useState(false);
	const { gameId } = useParams();
	const { data, loading, error } = useGetGameQuery({ variables: { gameId } });
	const user = useContext(UserContext)!;

	if (loading) return <IonLoading isOpen />;

	if (!data?.getGame.players.map((player) => player.id).includes(user.id)) {
		return <Redirect to="/game" />;
	}

	return (
		<IonPage>
			<IonContent>
				<IonGrid className="game-play-container">
					<IonRow>
						<IonCol>
							{error && <ErrorMsg message={error.message} />}
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
