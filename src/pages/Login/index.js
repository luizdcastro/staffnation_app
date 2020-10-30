import React, { useState } from "react";
import { connect } from "react-redux";
import {
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
	KeyboardAvoidingView,
	TextInput,
	ScrollView,
	TouchableWithoutFeedback,
	Platform,
} from "react-native";

import { TextInputMask } from "react-native-masked-text";
import * as Animatable from "react-native-animatable";
import { cpf } from "cpf-cnpj-validator";
import { Ionicons } from "@expo/vector-icons";
import Feather from "react-native-vector-icons/Feather";

import GradientButton from "../../components/GradientButton";
import { loginUser } from "../../redux/actions/authActions";

const LoginPage = ({ navigation, dispatchLoginAction }) => {
	const [userCpf, setUserCpf] = useState("");
	const [verifyUserCpf, setVerifyUserCpf] = useState("");
	const [cpfFormFilled, setCpfFormFilled] = useState(false);
	const [userPassword, setUserPassword] = useState("");
	const [secureTextEntry, setSecureTextEntry] = useState(true);
	const [error, setError] = useState("");

	const handleLogin = (event) => {
		event.preventDefault();
		dispatchLoginAction(
			userCpf,
			userPassword,
			(response) => console.log(response),
			(error) => {
				setError(error);
				console.log(error);
			}
		);
	};

	const handleCpfInput = (text) => {
		if (cpf.isValid(text)) {
			setUserCpf(text);
			setVerifyUserCpf(true);
		} else {
			setVerifyUserCpf(false);
		}
	};

	return (
		<KeyboardAvoidingView
			behavior={Platform.OS === "ios" ? "padding" : "height"}
			style={styles.mainContainer}
		>
			<View style={{ flex: 1 }}>
				<TouchableWithoutFeedback
					onPress={() => {
						navigation.goBack();
						setCpfFormFilled(false);
					}}
				>
					<ScrollView></ScrollView>
				</TouchableWithoutFeedback>
			</View>
			{cpfFormFilled === false ? (
				<Animatable.View animation="fadeInUpBig" style={styles.formContainer}>
					<Text style={styles.title}>Digite seu CPF</Text>
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
				</Animatable.View>
			) : (
				<View style={styles.formContainer}>
					<Animatable.Text animation="fadeInUp" style={styles.title}>
						Insira a senha de acesso
					</Animatable.Text>
					<View style={{ flexDirection: "row", alignItems: "center" }}>
						<TextInput
							style={styles.input}
							autoCorrect={false}
							autoCapitalize="none"
							autoFocus={true}
							selectionColor="#242424"
							underlineColorAndroid="transparent"
							keyboardType="number-pad"
							secureTextEntry={secureTextEntry}
							onChangeText={(val) => setUserPassword(val)}
							value={userPassword}
							blurOnSubmit={false}
						/>
						<TouchableOpacity onPress={() => setSecureTextEntry(!secureTextEntry)}>
							{secureTextEntry ? (
								<Feather name="eye-off" color="#a8a8a8" size={20} />
							) : (
								<Feather name="eye" color="#a8a8a8" size={20} />
							)}
						</TouchableOpacity>
					</View>
					<View style={styles.buttonContainer}>
						{userPassword.length >= 6 ? (
							<GradientButton
								onPress={handleLogin}
								gradient={["#FFE45C", "#FFC900"]}
								title="Entrar"
							/>
						) : (
							<GradientButton
								onPress={() => {}}
								gradient={["#d7d7d7", "#e0e0e0"]}
								title="Entrar"
								textStyle={{ color: "#939393" }}
							/>
						)}
					</View>
				</View>
			)}
		</KeyboardAvoidingView>
	);
};

const styles = StyleSheet.create({
	mainContainer: {
		flex: 1,
		backgroundColor: "grey",
	},
	formContainer: {
		flex: 1,
		justifyContent: "space-around",
		borderTopEndRadius: 20,
		borderTopStartRadius: 20,
		backgroundColor: "#f4f4f4",
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
	},

	buttonContainer: {
		justifyContent: "flex-end",
		alignItems: "center",
		paddingBottom: 10,
	},
});

const mapDispatchToProps = (dispatch) => ({
	dispatchLoginAction: (cpf, password, onSuccess, onError) =>
		dispatch(loginUser({ cpf, password }, onSuccess, onError)),
});

export default connect(null, mapDispatchToProps)(LoginPage);
