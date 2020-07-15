import { IonLoading } from "@ionic/react";
import React from "react";
import { useMeQuery } from "../generated";
import { UserContext } from "../utils/context";
import { PrivateRoutes } from "./PrivateRoutes";
import { PublicRoutes } from "./PublicRoutes";

export const AppRoutes = () => {
	const { data, loading } = useMeQuery();
	if (loading) return <IonLoading isOpen />;

	if (data?.me)
		return (
			<UserContext.Provider value={data.me}>
				<PrivateRoutes />
			</UserContext.Provider>
		);

	return <PublicRoutes />;
};
