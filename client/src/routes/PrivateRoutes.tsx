import { IonRouterOutlet } from "@ionic/react";
import React, { Fragment, useEffect, useState } from "react";
import { Redirect, Route, useLocation } from "react-router";
import { AppHeader } from "../components/AppHeader";
import { AppMenu } from "../components/AppMenu";
import { AppModal } from "../components/AppModal";
import { ExitConfirmation } from "../components/ExitConfirmation";
import { GamePage } from "../pages/Game";
import { NewGamePage } from "../pages/NewGame";
import { ProfilePage } from "../pages/Profile";
import { RulesPage } from "../pages/Rules";

export const PrivateRoutes = () => {
	const [showExitConfirmation, setShowExitConfirmation] = useState(false);
	const { pathname } = useLocation();

	useEffect(() => {
		document.addEventListener("ionBackButton", (e: any) => {
			e.detail.register(-1, () => {
				if (pathname === "/game") setShowExitConfirmation(true);
			});
		});
	});

	return (
		<Fragment>
			<AppHeader />
			<IonRouterOutlet id="appRouter">
				<Route path="/profile" component={ProfilePage} exact />
				<Route path="/rules" component={RulesPage} exact />
				<Route path="/game" component={NewGamePage} exact />
				<Route path="/game/:gameId" component={GamePage} exact />
				<Redirect to="/game" />
			</IonRouterOutlet>
			<AppMenu />
			{showExitConfirmation && (
				<AppModal
					header="Do you want to Exit?"
					onClose={() => setShowExitConfirmation(false)}
				>
					<ExitConfirmation closeModal={() => setShowExitConfirmation(false)} />
				</AppModal>
			)}
		</Fragment>
	);
};
