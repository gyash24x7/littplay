import {
	IonCard,
	IonCardContent,
	IonCardSubtitle,
	IonCardTitle
} from "@ionic/react";
import React from "react";

interface BannerProps {
	content?: string;
	color: "success" | "warning" | "danger";
	isLast?: boolean;
}

export const Banner = ({ content, color, isLast }: BannerProps) => (
	<IonCard className="banner" color={color}>
		<IonCardContent>
			<IonCardTitle>
				<IonCardSubtitle className="subtitle">
					{isLast ? "PREVIOUS" : "CURRENT"}&nbsp;MOVE
				</IonCardSubtitle>
				<IonCardTitle>{content}</IonCardTitle>
			</IonCardTitle>
		</IonCardContent>
	</IonCard>
);
