import React, { useState } from "react";
import { KeyboardAvoidingView, StyleSheet, Platform } from "react-native";

import FormCpf from "../../components/FormCpf";
import FormNamedate from "../../components/FormNameDate";

const RegisterPage = ({ navigation }) => {
	const [cpfFormFilled, setCpfFormFilled] = useState(false);

	return (
		<KeyboardAvoidingView
			behavior={Platform.OS === "ios" ? "padding" : ""}
			style={styles.container}
		>
			{!cpfFormFilled ? (
				<FormCpf setCpfFormFilled={setCpfFormFilled} navigation={navigation} />
			) : (
				<FormNamedate setCpfFormFilled={setCpfFormFilled} />
			)}
		</KeyboardAvoidingView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});

export default RegisterPage;
