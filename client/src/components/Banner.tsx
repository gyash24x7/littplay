import { IonCard, IonCardContent, IonCardTitle } from "@ionic/react";
import React from "react";

interface BannerProps {
	content: string;
}

export const Banner = ({ content }: BannerProps) => (
	<IonCard className="banner" color="success">
		<IonCardContent>
			<IonCardTitle>
				<IonCardTitle>{content}</IonCardTitle>
			</IonCardTitle>
		</IonCardContent>
	</IonCard>
);
