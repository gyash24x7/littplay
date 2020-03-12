import { Button, Layout, Modal } from "@ui-kitten/components";
import React from "react";

import styles from "../styles";

interface JoinGameProps {
	visible: boolean;
	setVisible: (val: boolean) => void;
}

export const JoinGame = ({ visible, setVisible }: JoinGameProps) => {
	const toggleModal = () => {
		setVisible(!visible);
	};

	return (
		<Modal
			backdropStyle={styles.backdrop}
			onBackdropPress={toggleModal}
			visible={visible}
		>
			<Layout>
				<Layout>
					<Button>Hi</Button>
				</Layout>
			</Layout>
		</Modal>
	);
};
