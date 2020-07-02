import { Clipboard } from "@ionic-native/clipboard";
import {
	IonAvatar,
	IonButton,
	IonCard,
	IonCardHeader,
	IonCardSubtitle,
	IonCardTitle,
	IonCol,
	IonLoading,
	IonRow,
	IonText,
	IonTitle,
	isPlatform
} from "@ionic/react";
import React, { useContext } from "react";
import { GameStatus, GetGameQuery, useStartGameMutation } from "../generated";
import { UserContext } from "../utils/context";
import { ErrorMsg } from "./ErrorMsg";

interface StartGameProps {
	game: GetGameQuery["getGame"];
	displayToast: () => void;
}

export const GameDescription = ({ game, displayToast }: StartGameProps) => {
	const [startGame, { loading, error }] = useStartGameMutation({
		variables: { gameId: game._id }
	});

	const user = useContext(UserContext)!;

	const copyCode = () => {
		if (isPlatform("desktop")) {
			navigator.permissions.query({ name: "clipboard" }).then((result) => {
				if (result.state == "granted" || result.state == "prompt") {
					navigator.clipboard?.writeText(game.code).then(displayToast);
				}
			});
		} else {
			Clipboard.copy(game.code).then(displayToast);
		}
	};

	return (
		<IonRow>
			<IonCol>
				<IonCard className="game-play-card">
					{loading && <IonLoading isOpen />}
					<IonCardHeader>
						<IonRow className="game-description-row">
							<IonCol sizeSm="6" sizeMd="4">
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
							{game.status === GameStatus.TeamsCreated &&
								game.createdBy._id === user._id && (
									<IonCol sizeXl="3" sizeSm="4" size="12">
										<IonButton
											className="app-button small"
											onClick={() => startGame()}
										>
											Start Game
										</IonButton>
									</IonCol>
								)}
							{game.status === GameStatus.InProgress && (
								<IonCol sizeMd="8" size="12">
									<IonRow>
										{game.teams.map((team) => (
											<IonCol className="team-score-card" key={team}>
												<IonTitle className="montserrat">{team}</IonTitle>
												<br />
												<div className="avatar-group">
													{game.players
														.filter((player) => player.team === team)
														.map(({ avatar, _id }) => (
															<IonAvatar key={_id}>
																<img src={avatar} alt="" />
															</IonAvatar>
														))}
												</div>
												<br />
												<IonText className="game-score">0</IonText>
											</IonCol>
										))}
									</IonRow>
								</IonCol>
							)}
						</IonRow>
						{error && <ErrorMsg message={error.message} />}
					</IonCardHeader>
				</IonCard>
			</IonCol>
		</IonRow>
	);
};
