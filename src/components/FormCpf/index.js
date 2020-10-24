import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import GradientButton from "../../components/GradientButton";
import { cpf } from "cpf-cnpj-validator";
import { TextInputMask } from "react-native-masked-text";
import { MaterialIcons } from "@expo/vector-icons";

const FormCpf = ({ navigation, setCpfFormFilled }) => {
	const [userCpf, setUserCpf] = useState("");
	const [verifyUserCpf, setVerifyUserCpf] = useState("");

	const handleCpfInput = (text) => {
		if (cpf.isValid(text)) {
			setUserCpf(text);
			setVerifyUserCpf(true);
		} else {
			setVerifyUserCpf(false);
		}
	};

	return (
		<View style={styles.container}>
			<TouchableOpacity
				style={styles.buttonClose}
				onPress={() => navigation.goBack()}
			>
				<Ionicons name="ios-close" size={35} color="#242424" />
			</TouchableOpacity>
			<View style={{ flex: 1, justifyContent: "space-between" }}>
				<Text style={styles.title}>Vamos começar o cadastro, digite seu CPF </Text>
				<View style={styles.inputContainer}>
					<View style={{ flexDirection: "row", alignItems: "center" }}>
						<TextInputMask
							blurOnSubmit={false}
							style={[
								(verifyUserCpf === false) & (userCpf.length === 14)
									? [styles.input, { color: "#ff5555" }]
									: styles.input,
							]}
							type={"cpf"}
							value={userCpf}
							autoFocus={true}
							keyboardType="number-pad"
							onChangeText={(text) => {
								handleCpfInput(text);
								setUserCpf(text);
							}}
						/>
						{userCpf.length >= 1 ? (
							<TouchableOpacity onPress={() => setUserCpf("")}>
								<Ionicons name="ios-close-circle" size={25} color="#a8a8a8" />
							</TouchableOpacity>
						) : null}
					</View>
					{(verifyUserCpf === false) & (userCpf.length === 14) ? (
						<View style={styles.errorContainer}>
							<MaterialIcons name="error" size={20} color="#ff5555" />
							<Text style={styles.errorText}>CPF inválido</Text>
						</View>
					) : null}
				</View>
				<View style={styles.buttonContainer}>
					{verifyUserCpf ? (
						<GradientButton
							title="Continuar"
							gradient={["#FFE45C", "#FFC900"]}
							onPress={() => setCpfFormFilled(true)}
						/>
					) : (
						<GradientButton
							onPress={() => {}}
							gradient={["#d7d7d7", "#e0e0e0"]}
							title="Continuar"
							textStyle={{ color: "#939393" }}
						/>
					)}
				</View>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	buttonClose: {
		width: 30,
		height: 30,
		marginTop: 30,
		paddingLeft: 15,
	},
	title: {
		fontSize: 23,
		fontFamily: "Montserrat_400Regular",
		color: "#242424",
		marginTop: 35,
		paddingHorizontal: 15,
	},
	input: {
		fontSize: 24,
		color: "#242424",
		fontFamily: "Montserrat_500Medium",
		width: "90%",
		height: 45,
		paddingHorizontal: 15,
		position: "relative",
	},
	inputClaear: {
		width: 50,
		height: 50,
	},
	errorContainer: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "flex-start",
		paddingHorizontal: 15,
		position: "absolute",
		top: 40,
	},
	errorText: {
		fontSize: 13,
		color: "#ff5555",
		paddingLeft: 8,
	},
	buttonContainer: {
		justifyContent: "flex-end",
		alignItems: "center",
		paddingBottom: 20,
	},
});

export default FormCpf;
