import React, { useState } from "react";
import { KeyboardAvoidingView, StyleSheet, Platform } from "react-native";

import FormCpf from "../../components/FormCpf";
import FormNamedate from "../../components/FormNameDate";
import FormAdress from "../../components/FormAddress";

const RegisterPage = ({ navigation }) => {
	const [cpfFormFilled, setCpfFormFilled] = useState(false);
	const [nameDateFormFilled, setNameDateFormFilled] = useState(false);
	const [addressFormFilled, setAdressFormFilled] = useState(false);

	return (
		<KeyboardAvoidingView
			behavior={Platform.OS === "ios" ? "padding" : ""}
			style={styles.container}
		>
			{!cpfFormFilled ? (
				<FormCpf setCpfFormFilled={setCpfFormFilled} navigation={navigation} />
			) : cpfFormFilled & !nameDateFormFilled ? (
				<FormNamedate
					setCpfFormFilled={setCpfFormFilled}
					setNameDateFormFilled={setNameDateFormFilled}
				/>
			) : nameDateFormFilled ? (
				<FormAdress
					setNameDateFormFilled={setNameDateFormFilled}
					setAdressFormFilled={setAdressFormFilled}
				/>
			) : null}
		</KeyboardAvoidingView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});

export default RegisterPage;
