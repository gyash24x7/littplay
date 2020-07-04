import {
	IonCard,
	IonCardContent,
	IonCardSubtitle,
	IonCardTitle
} from "@ionic/react";
import React from "react";

interface BannerProps {
	content: string;
	color: "success" | "warning" | "danger";
	heading: string;
}

export const Banner = ({ content, color, heading }: BannerProps) => (
	<IonCard className="game-play-card" color={color}>
		<IonCardContent>
			<IonCardTitle>
				<IonCardSubtitle className="subtitle">{heading}</IonCardSubtitle>
				<IonCardTitle>{content}</IonCardTitle>
			</IonCardTitle>
		</IonCardContent>
	</IonCard>
);
