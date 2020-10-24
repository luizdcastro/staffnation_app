import React, { useState } from "react";
import {
	View,
	Text,
	TextInput,
	TouchableOpacity,
	KeyboardAvoidingView,
	StyleSheet,
	Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import GradienButton from "../../components/GradientButton";
import { cpf } from "cpf-cnpj-validator";
import { TextInputMask } from "react-native-masked-text";

const RegisterPage = ({ navigation }) => {
	const [userCpf, setUserCpf] = useState("");
	const [verifyUserCpf, setVerifyUserCpf] = useState("");

	const handleCpfInput = (text) => {
		if (cpf.isValid(text)) {
			setVerifyUserCpf("cpf valid");
		} else {
			setVerifyUserCpf("cpf invalid");
		}
	};

	console.log(verifyUserCpf);

	return (
		<KeyboardAvoidingView
			style={styles.container}
			behavior={Platform.OS === "ios" ? "padding" : "height"}
		>
			<TouchableOpacity
				style={styles.buttonClose}
				onPress={() => navigation.goBack()}
			>
				<Ionicons name="ios-close" size={35} color="#242424" />
			</TouchableOpacity>
			<Text style={styles.title}>Para começar informe seu CPF</Text>
			<TextInputMask
				style={styles.input}
				type={"cpf"}
				value={userCpf}
				onChangeText={(text) => {
					handleCpfInput(text);
					setUserCpf(text);
				}}
			/>
			<View style={styles.inputContainer}>
				<GradienButton title="Continuar" gradient={["#FFE45C", "#FFC900"]} />
			</View>
		</KeyboardAvoidingView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingHorizontal: 20,
	},
	buttonClose: {
		width: 50,
		height: 50,
		marginTop: 30,
	},
	title: {
		fontSize: 23,
		fontFamily: "Montserrat_500Medium",
		color: "#242424",
	},
	inputContainer: {
		paddingVertical: 10,
	},
	input: {
		fontSize: 22,
		color: "#242424",
		fontFamily: "Montserrat_400Regular",
		width: "97%",
		height: 45,
		marginBottom: 20,
	},
});

export default RegisterPage;
