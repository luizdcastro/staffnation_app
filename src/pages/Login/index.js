import React, { useEffect, useState } from "react";
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
	ActivityIndicator,
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
	const [error, setError] = useState(false);
	const [loading, setLoading] = useState(false);

	const handleLogin = (event) => {
		event.preventDefault();
		setLoading(true);
		dispatchLoginAction(
			userCpf,
			userPassword,
			(response) => {
				console.log(response);
				setLoading(false)

			},
			(error) => {
				setError(error)
				setLoading(false)
				console.log('Erro de auth')
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
				<Animatable.View animation="fadeInUp" style={styles.formContainer}>
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
								gradient={["#2397d4", "#2397d4"]}
								onPress={() => setCpfFormFilled(true)}
							/>
						) : (
								<GradientButton
									onPress={() => { }}
									gradient={["#cfd8dc", "#cfd8dc"]}
									title="Continuar"
									textStyle={{ color: "#607d8b" }}
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
								autoFocus={true}
								keyboardType="number-pad"
								selectionColor="#242424"
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
							{userPassword.length >= 6 & !loading ?
								<GradientButton
									onPress={handleLogin}
									gradient={["#2397d4", "#2397d4"]}
									title="Entrar"
								/>
								: userPassword.length <= 6 & !loading ?
									<GradientButton
										onPress={() => { }}
										gradient={["#cfd8dc", "#cfd8dc"]}
										title="Entrar"
										textStyle={{ color: "#607d8b" }}
									/>
									: userPassword.length >= 6 & loading ?
										<GradientButton
											onPress={() => { }}
											gradient={["#2397d4", "#2397d4"]}
											children={<ActivityIndicator style={{ paddingBottom: 15 }} size="large" color="#eceff1" animating={loading} />
											}
										/>
										: null
							}
						</View>
					</View>
				)}
		</KeyboardAvoidingView>
	);
};

const styles = StyleSheet.create({
	mainContainer: {
		flex: 1,
		backgroundColor: "#263238",
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
