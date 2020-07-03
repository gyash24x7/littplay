import {
	IonCol,
	IonContent,
	IonGrid,
	IonLoading,
	IonPage,
	IonRow,
	IonToast
} from "@ionic/react";
import React, { useContext, useEffect, useState } from "react";
import { Redirect, useParams } from "react-router";
import { CreateTeams } from "../components/CreateTeams";
import { ErrorMsg } from "../components/ErrorMsg";
import { GameDescription } from "../components/GameDescription";
import { GiveOrDecline } from "../components/GiveOrDecline";
import { HandCard } from "../components/HandCard";
import { PlayersCard } from "../components/PlayersCard";
import { PreviousMoves } from "../components/PreviousMoves";
import { TeamsCard } from "../components/TeamsCard";
import { TurnSegment } from "../components/TurnSegment";
import {
	GetGameQuery,
	useGameSubscription,
	useGetGameQuery
} from "../generated";
import { GameContext, UserContext } from "../utils/context";

export const GamePage = () => {
	const [toastContent, setToastContent] = useState<string>();
	const [game, setGame] = useState<GetGameQuery["getGame"]>();
	const { gameId } = useParams();
	const { _id } = useContext(UserContext)!;

	const { loading, error, data } = useGetGameQuery({ variables: { gameId } });

	useGameSubscription({
		variables: { gameId },
		onSubscriptionData({ subscriptionData: { data } }) {
			if (data?.game) {
				setGame(game);
			}
		}
	});

	useEffect(() => {
		if (data?.getGame) setGame(data.getGame);
	}, [data]);

	if (error) return <ErrorMsg message={error.message} />;

	if (loading || !game) return <IonLoading isOpen />;

	if (!game.players.map(({ _id }) => _id).includes(_id)) {
		return <Redirect to="/game" />;
	}

	const { status, players, currentMove } = game;

	return (
		<IonPage>
			<IonContent>
				<GameContext.Provider value={game}>
					<IonGrid className="game-play-container">
						<GameDescription
							displayToast={() => setToastContent("Code copied to clipboard!")}
						/>
						{(status === "NOT_STARTED" || status === "PLAYERS_READY") && (
							<PlayersCard />
						)}
						{status === "PLAYERS_READY" && _id === game.createdBy._id && (
							<CreateTeams />
						)}
						{status === "TEAMS_CREATED" && <TeamsCard />}
						{status === "IN_PROGRESS" && (
							<IonRow>
								<IonCol size="12" sizeLg="6">
									<PreviousMoves />
									{currentMove?.turn === _id && <TurnSegment />}
									{currentMove?.askedFrom === _id && <GiveOrDecline />}
								</IonCol>
								<IonCol size="12" sizeLg="6">
									<HandCard
										player={players.find((plyr) => _id === plyr._id)!}
									/>
								</IonCol>
							</IonRow>
						)}
					</IonGrid>
				</GameContext.Provider>
				<IonToast
					isOpen={!!toastContent}
					duration={2500}
					onDidDismiss={() => setToastContent(undefined)}
					message={toastContent}
				/>
			</IonContent>
		</IonPage>
	);
};
