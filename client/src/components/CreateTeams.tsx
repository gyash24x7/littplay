import {
	IonButton,
	IonCard,
	IonCardContent,
	IonCardHeader,
	IonCardTitle,
	IonCol,
	IonGrid,
	IonInput,
	IonItem,
	IonLoading,
	IonRow
} from "@ionic/react";
import React, { useState } from "react";
import { useParams } from "react-router";
import { refetchGetGameQuery, useCreateTeamsMutation } from "../generated";
import { ErrorMsg } from "./ErrorMsg";

export const CreateTeams = () => {
	const [teamA, setTeamA] = useState("");
	const [teamB, setTeamB] = useState("");
	const [errorMsg, setErrorMsg] = useState<string>();
	const { gameId } = useParams();

	const [createTeams, { loading }] = useCreateTeamsMutation({
		variables: { teams: [teamA, teamB], gameId },
		refetchQueries: [refetchGetGameQuery({ gameId })],
		onError: (error) => setErrorMsg(error.message)
	});

	const validateFields = () => {
		switch (true) {
			case !teamA:
			case !teamB:
				return "Team Name cannot be Empty!";
		}
		return;
	};

	const handleInput = (field: "teamA" | "teamB") => (e: any) => {
		switch (field) {
			case "teamA":
				setTeamA(e.target.value || "");
				break;
			case "teamB":
				setTeamB(e.target.value || "");
				break;
		}
	};

	const handleSubmit = () => {
		const errorMsg = validateFields();
		if (!errorMsg) createTeams();
		setErrorMsg(errorMsg);
	};

	return (
		<IonCard className="game-play-card">
			<IonLoading isOpen={loading} />
			<IonCardHeader>
				<IonCardTitle>CREATE TEAMS</IonCardTitle>
			</IonCardHeader>
			<IonCardContent>
				<IonGrid>
					<IonRow style={{ justifyContent: "center" }}>
						<IonCol sizeLg="4" sizeMd="5" sizeSm="8" size="12">
							<IonItem>
								<IonInput
									className="app-input"
									placeholder="Team A Name"
									value={teamA}
									onInput={handleInput("teamA")}
								/>
							</IonItem>
						</IonCol>
						<IonCol sizeLg="4" sizeMd="5" sizeSm="8" size="12">
							<IonItem>
								<IonInput
									className="app-input"
									placeholder="Team B Name"
									value={teamB}
									onInput={handleInput("teamB")}
								/>
							</IonItem>
						</IonCol>
					</IonRow>
					<IonRow style={{ justifyContent: "center" }}>
						<IonCol sizeLg="4" sizeMd="5" sizeSm="8" size="12">
							<IonButton className="app-button" onClick={handleSubmit}>
								Submit
							</IonButton>
						</IonCol>
					</IonRow>
					{errorMsg && <ErrorMsg message={errorMsg} />}
				</IonGrid>
			</IonCardContent>
		</IonCard>
	);
};
