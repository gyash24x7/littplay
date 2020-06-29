import {
	IonCol,
	IonContent,
	IonGrid,
	IonLoading,
	IonPage,
	IonRow,
	IonToast
} from "@ionic/react";
import React, { Fragment, useContext, useState } from "react";
import { Redirect, useParams } from "react-router";
import { CreateTeams } from "../components/CreateTeams";
import { ErrorMsg } from "../components/ErrorMsg";
import { NewGameCard } from "../components/NewGameCard";
import { PlayersCard } from "../components/PlayersCard";
import { TeamCard } from "../components/TeamCard";
import { Game, GameStatus, useGetGameQuery } from "../generated";
import { DeepPartial } from "../generated/types";
import { UserContext } from "../utils/context";

export const GamePage = () => {
	const [isToastVisible, setIsToastVisible] = useState(false);
	const [game, setGame] = useState<DeepPartial<Game>>();
	const { gameId } = useParams();
	const { loading, error } = useGetGameQuery({
		variables: { gameId },
		onCompleted: (data) => setGame(data.getGame)
	});
	const user = useContext(UserContext)!;

	if (loading) return <IonLoading isOpen />;

	if (
		game?.players &&
		!game.players.map((player) => player?.id).includes(user.id)
	) {
		return <Redirect to="/game" />;
	}

	return (
		<IonPage>
			<IonContent>
				<IonGrid className="game-play-container">
					{error && (
						<IonRow>
							<IonCol>
								<ErrorMsg message={error.message} />
							</IonCol>
						</IonRow>
					)}
					{game && (
						<IonRow>
							<IonCol>
								<NewGameCard
									gameCode={game.code!}
									displayToast={() => setIsToastVisible(true)}
								/>
							</IonCol>
						</IonRow>
					)}
					{game?.status === GameStatus.NotStarted && (
						<Fragment>
							<IonRow>
								<IonCol>
									<PlayersCard
										players={game.players || []}
										gameCode={game.code!}
									/>
								</IonCol>
							</IonRow>
							<IonRow>
								<IonCol>
									<CreateTeams />
								</IonCol>
							</IonRow>
						</Fragment>
					)}
					{game?.status === GameStatus.TeamsCreated && (
						<IonRow>
							{game.teams?.map((team) => (
								<IonCol key={team} sizeMd="6" size="12">
									<TeamCard
										team={team!}
										players={
											game.players?.filter((player) => player?.team === team) ||
											[]
										}
									/>
								</IonCol>
							))}
						</IonRow>
					)}
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
