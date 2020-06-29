import {
	IonAvatar,
	IonButton,
	IonCard,
	IonCardContent,
	IonCardHeader,
	IonCardSubtitle,
	IonCardTitle,
	IonChip,
	IonCol,
	IonLabel,
	IonLoading,
	IonRow,
	IonText
} from "@ionic/react";
import React from "react";
import {
	Game,
	GameStatus,
	refetchGetGameQuery,
	useStartGameMutation
} from "../generated";
import { DeepPartial } from "../generated/types";
import { ErrorMsg } from "./ErrorMsg";

interface StartGameProps {
	game: DeepPartial<Game>;
	displayToast: () => void;
}

export const GameDescription = ({ game, displayToast }: StartGameProps) => {
	const [startGame, { loading, error }] = useStartGameMutation({
		variables: { gameId: game.id! },
		refetchQueries: [refetchGetGameQuery({ gameId: game.id! })]
	});

	const copyCode = () =>
		navigator.clipboard.writeText(game.code!).then(displayToast);

	return (
		<IonRow>
			<IonCol>
				<IonCard className="game-play-card">
					{loading && <IonLoading isOpen />}
					<IonCardHeader>
						<IonRow
							style={{
								justifyContent: "space-between",
								alignItems: "center",
								textAlign: "left"
							}}
						>
							<IonCol>
								<IonCardSubtitle className="card-subtitle">
									GAME CODE
								</IonCardSubtitle>
								<IonCardTitle className="game-code">{game.code}</IonCardTitle>
								<IonCardSubtitle className="montserrat">
									Share the code with other players
								</IonCardSubtitle>
							</IonCol>

							{game.status === GameStatus.NotStarted && (
								<IonCol sizeXl="3" sizeSm="4" size="12">
									<IonButton
										color="dark"
										className="app-button small"
										onClick={copyCode}
									>
										Copy Code
									</IonButton>
								</IonCol>
							)}
							{game.status === GameStatus.TeamsCreated && (
								<IonCol sizeXl="3" sizeSm="4" size="12">
									<IonButton
										className="app-button small"
										onClick={() => startGame()}
									>
										Start Game
									</IonButton>
								</IonCol>
							)}
						</IonRow>
						<IonRow>
							{game.status === GameStatus.InProgress &&
								game.teams?.map((team) => (
									<IonCard key={team} className="game-play-card">
										<IonCardHeader>
											<IonCardTitle className="montserrat">{team}</IonCardTitle>
										</IonCardHeader>
										<IonCardContent>
											{game.players
												?.filter((player) => player?.team === team)
												.map((player) => player?.user)
												.map((user) => (
													<IonChip key={user?.id}>
														<IonAvatar>
															<img src={user?.avatar} alt="" />
														</IonAvatar>
														<IonLabel>{user?.name}</IonLabel>
													</IonChip>
												))}
											<br />
											<br />
											<IonText className="game-score">0</IonText>
										</IonCardContent>
									</IonCard>
								))}
						</IonRow>
						{error && <ErrorMsg message={error.message} />}
					</IonCardHeader>
				</IonCard>
			</IonCol>
		</IonRow>
	);
};
