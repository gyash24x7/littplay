import { IonButton, IonLoading, IonText } from "@ionic/react";
import React, { useState } from "react";
import { refetchMeQuery, useUpdateAvatarMutation } from "../generated";
import { ErrorMsg } from "./ErrorMsg";

interface ChangeAvatarProps {
	currentAvatar: string;
	close: () => void;
}

const reqUrl =
	process.env.NODE_ENV === "production"
		? "https://literature.yashgupta.dev/avatar/random"
		: "http://192.168.43.59:8000/avatar/random";

export const ChangeAvatar = ({ currentAvatar, close }: ChangeAvatarProps) => {
	const [newAvatar, setNewAvatar] = useState(currentAvatar);
	const [errorMsg, setErrorMsg] = useState("");

	const [updateAvatar, { loading }] = useUpdateAvatarMutation({
		variables: { avatar: newAvatar },
		refetchQueries: [refetchMeQuery()],
		onCompleted: () => close(),
		onError: (err) => setErrorMsg(err.message)
	});

	const fetchNewAvatar = () =>
		fetch(reqUrl)
			.then((res) => res.json())
			.then(({ url }) => setNewAvatar(url));

	return (
		<div className="avatar-change-modal">
			<IonLoading isOpen={loading} />
			<IonText>Current Avatar</IonText>
			<img src={newAvatar} alt="" className="user-avatar" />
			<br />
			<IonButton
				className="app-button small"
				onClick={fetchNewAvatar}
				color="dark"
			>
				Generate Random
			</IonButton>
			<div>
				<IonButton
					className="app-button small"
					color="danger"
					onClick={() => setNewAvatar(currentAvatar)}
				>
					Discard
				</IonButton>
				<IonButton className="app-button small" onClick={() => updateAvatar()}>
					Save
				</IonButton>
			</div>
			{errorMsg && <ErrorMsg message={errorMsg} />}
		</div>
	);
};
