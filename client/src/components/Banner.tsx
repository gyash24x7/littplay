import {
	IonCard,
	IonCardContent,
	IonCardHeader,
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
	<IonCard className="game-play-card banner" color={color}>
		<IonCardHeader className="banner-header">
			<IonCardSubtitle className="subtitle">{heading}</IonCardSubtitle>
		</IonCardHeader>
		<IonCardContent className="banner-content">
			<IonCardTitle>{content}</IonCardTitle>
		</IonCardContent>
	</IonCard>
);
