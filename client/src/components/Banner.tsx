import { IonCard, IonCardContent, IonCardTitle } from "@ionic/react";
import React from "react";

interface BannerProps {
	content?: string;
	color: "success" | "warning" | "danger";
}

export const Banner = ({ content, color }: BannerProps) => (
	<IonCard className="banner" color={color}>
		<IonCardContent>
			<IonCardTitle>
				<IonCardTitle>{content}</IonCardTitle>
			</IonCardTitle>
		</IonCardContent>
	</IonCard>
);
