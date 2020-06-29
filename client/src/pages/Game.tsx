import {
	IonContent,
	IonGrid,
	IonLoading,
	IonPage,
	IonToast
} from "@ionic/react";
import React, { useContext, useEffect, useState } from "react";
import { Redirect, useParams } from "react-router";
import { CreateTeams } from "../components/CreateTeams";
import { ErrorMsg } from "../components/ErrorMsg";
import { GameDescription } from "../components/GameDescription";
import { HandCard } from "../components/HandCard";
import { PlayersCard } from "../components/PlayersCard";
import { TeamsCard } from "../components/TeamsCard";
import {
	GameStatus,
	GetGameQuery,
	useGameActivitySubscription,
	useGetGameQuery
} from "../generated";
import { UserContext } from "../utils/context";

export const GamePage = () => {
	const [toastContent, setToastContent] = useState<string>();
	const [game, setGame] = useState<GetGameQuery["getGame"]>();
	const { gameId } = useParams();
	const { id } = useContext(UserContext)!;

	const { loading, error, data } = useGetGameQuery({ variables: { gameId } });

	useGameActivitySubscription({
		variables: { gameId },
		onSubscriptionData({ subscriptionData: { data } }) {
			setToastContent(data?.gameActivity.description);
			setGame(data?.gameActivity.game);
		}
	});

	useEffect(() => {
		if (data?.getGame) setGame(data.getGame);
	}, [data]);

	if (error) return <ErrorMsg message={error.message} />;

	if (loading || !game) return <IonLoading isOpen />;

	if (!game.players.map(({ user: { id } }) => id).includes(id)) {
		return <Redirect to="/game" />;
	}

	const { status, players, teams } = game;

	return (
		<IonPage>
			<IonContent>
				<IonGrid className="game-play-container">
					<GameDescription
						game={game}
						displayToast={() => setToastContent("Code copied to clipboard!")}
					/>
					{(status === GameStatus.NotStarted ||
						status === GameStatus.PlayersReady) && (
						<PlayersCard players={players} />
					)}
					{status === GameStatus.PlayersReady && <CreateTeams />}
					{status === GameStatus.TeamsCreated && (
						<TeamsCard teams={teams} players={players} />
					)}
					{status === GameStatus.InProgress && (
						<HandCard player={players.find(({ user }) => id === user.id)!} />
					)}
				</IonGrid>
				<IonToast
					isOpen={!!toastContent}
					duration={1000}
					onDidDismiss={() => setToastContent(undefined)}
					message={toastContent}
				/>
			</IonContent>
		</IonPage>
	);
};
