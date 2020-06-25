import React from "react";
import { useMeQuery } from "../generated";
import { LoadingPage } from "../pages/Loading";
import { PrivateRoutes } from "./PrivateRoutes";
import { PublicRoutes } from "./PublicRoutes";

export const AppRoutes = () => {
	const { data, loading } = useMeQuery();
	if (loading) return <LoadingPage />;
	if (data?.me) return <PrivateRoutes />;
	return <PublicRoutes />;
};
