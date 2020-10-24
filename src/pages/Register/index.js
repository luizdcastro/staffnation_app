import React, { useState } from "react";
import { KeyboardAvoidingView, StyleSheet, Platform } from "react-native";

import FormCpf from "../../components/FormCpf";

const RegisterPage = ({ navigation }) => {
	const [cpfFormFilled, setCpfFormFilled] = useState(false);

	console.log(cpfFormFilled);

	return (
		<KeyboardAvoidingView
			behavior={Platform.OS === "ios" ? "padding" : "height"}
			style={styles.container}
		>
			<FormCpf setCpfFormFilled={setCpfFormFilled} navigation={navigation} />
		</KeyboardAvoidingView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});

export default RegisterPage;
