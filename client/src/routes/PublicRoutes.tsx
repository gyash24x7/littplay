import { IonRouterOutlet } from "@ionic/react";
import React, { Fragment, useEffect, useState } from "react";
import { Redirect, Route } from "react-router";
import { AppModal } from "../components/AppModal";
import { ExitConfirmation } from "../components/ExitConfirmation";
import { LoginPage } from "../pages/Login";
import { SignUpPage } from "../pages/Signup";

export const PublicRoutes = () => {
	const [showExitConfirmation, setShowExitConfirmation] = useState(false);

	useEffect(() => {
		document.addEventListener("ionBackButton", (e: any) => {
			e.detail.register(-1, () => {
				if (window.location.pathname === "/login")
					setShowExitConfirmation(true);
			});
		});
	}, []);

	return (
		<Fragment>
			<IonRouterOutlet>
				<Route path="/login" component={LoginPage} exact={true} />
				<Route path="/signup" component={SignUpPage} exact={true} />
				<Redirect to="/login" />
			</IonRouterOutlet>
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
