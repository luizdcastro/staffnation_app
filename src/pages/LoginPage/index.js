import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
	KeyboardAvoidingView,
	TextInput,
	ActivityIndicator,
	StatusBar,
	Platform,
} from "react-native";

import { TextInputMask } from "react-native-masked-text";
import * as Animatable from "react-native-animatable";
import { cpf } from "cpf-cnpj-validator";
import { Ionicons } from "@expo/vector-icons";
import Feather from "react-native-vector-icons/Feather";


import GradientButton from "../../components/GradientButton";
import { loginUser } from "../../redux/actions/authActions";
import { getUser } from "../../redux/actions/userActions"

const LoginPage = ({ navigation, dispatchLoginAction, dispatchGetUserAction }) => {
	const [userCpf, setUserCpf] = useState("");
	const [verifyUserCpf, setVerifyUserCpf] = useState("");
	const [cpfFormFilled, setCpfFormFilled] = useState(false);
	const [userPassword, setUserPassword] = useState("");
	const [secureTextEntry, setSecureTextEntry] = useState(true);
	const [error, setError] = useState(false);
	const [errorMessage, setErrorMessage] = useState('')
	const [loading, setLoading] = useState(false);

	const handleLogin = (event) => {
		event.preventDefault();
		setLoading(true);
		dispatchLoginAction(
			userCpf,
			userPassword,
			(response) => {
				console.log('logged in!');
				dispatchGetUserAction(response.data._id)
			},
			(response) => {
				setError(true);
				setErrorMessage(response.error)
			}
		);
	};

	useEffect(() => {
		if (error === true) {
			setLoading(false)
			setError(false)
		}
	}, [error, loading])

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
			<StatusBar barStyle='dark-content' backgroundColor='#fafafa' />
			<TouchableOpacity
				style={styles.buttonClose}
				onPress={() => { !cpfFormFilled ? navigation.navigate("AuthPage") : setCpfFormFilled(false) }}
			>
				<Ionicons name="ios-arrow-back" size={30} color="#00A699" />
			</TouchableOpacity>
			{cpfFormFilled === false ? (
				<View style={{ flex: 1, justifyContent: "space-between" }}>
					<Animatable.Text animation="fadeInUp" style={styles.title}>
						Para entrar, digite seu CPF
						</Animatable.Text>
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
						<TouchableOpacity style={styles.footerLink} onPress={() => navigation.navigate('RegisterPage')}>
							<Text style={styles.footerText}>Ainda não tem conta? Começar</Text>
							<Ionicons name="ios-arrow-forward" size={15} color="#00A699" />
						</TouchableOpacity>
						{verifyUserCpf ? (
							<GradientButton
								title="Continuar"
								gradient={["#00A699", "#00A699"]}
								onPress={() => setCpfFormFilled(true)}
							/>
						) : (
								<GradientButton
									onPress={() => { }}
									gradient={["#E8E8E8", "#E8E8E8"]}
									title="Continuar"
									textStyle={{ color: "#767676" }}
								/>
							)}
					</View>
				</View>
			) : (
					<View style={{ flex: 1, justifyContent: "space-between" }}>
						<Animatable.Text animation="fadeInUp" style={styles.title}>
							Qual sua senha de acesso?
					  </Animatable.Text>
						{errorMessage ?
							<Animatable.Text animation="fadeInLeft" style={styles.error}>
								{errorMessage}
							</Animatable.Text>
							: null}
						<View style={{ flexDirection: "row", alignItems: "center" }}>
							<TextInput
								style={styles.input}
								autoCorrect={false}
								autoFocus={true}
								keyboardType="number-pad"
								selectionColor="#484848"
								secureTextEntry={secureTextEntry}
								onChangeText={(val) => setUserPassword(val)}
								value={userPassword}
								blurOnSubmit={false}
							/>
							<TouchableOpacity onPress={() => setSecureTextEntry(!secureTextEntry)}>
								{secureTextEntry ? (
									<Feather name="eye-off" color="#a8a8a8" size={24} />
								) : (
										<Feather name="eye" color="#a8a8a8" size={24} />
									)}
							</TouchableOpacity>
						</View>
						<View style={styles.buttonContainer}>
							<TouchableOpacity style={styles.footerLink} onPress={() => { }}>
								<Text style={styles.footerText}>Esqueci minha senha</Text>
								<Ionicons name="ios-arrow-forward" size={15} color="#00A699" />
							</TouchableOpacity>
							{userPassword.length >= 6 & !loading ?
								<GradientButton
									onPress={handleLogin}
									gradient={["#00A699", "#00A699"]}
									title="Entrar"
								/>
								: userPassword.length <= 6 & !loading ?
									<GradientButton
										onPress={() => { }}
										gradient={["#E8E8E8", "#E8E8E8"]}
										title="Entrar"
										textStyle={{ color: "#767676" }}
									/>
									: userPassword.length >= 6 & loading ?
										<GradientButton
											onPress={() => { }}
											gradient={["#00A699", "#00A699"]}
											children={<ActivityIndicator style={{ paddingBottom: 10 }} size="large" color="#FAFAFA" animating={loading} />
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
		backgroundColor: "#fafafa",
	},
	buttonClose: {
		marginTop: 35,
		paddingHorizontal: 15,
	},
	title: {
		fontSize: 24,
		fontFamily: "NunitoSans_400Regular",
		color: "#484848",
		marginTop: 35,
		paddingHorizontal: 15,
	},
	input: {
		fontSize: 24,
		color: "#484848",
		fontFamily: "NunitoSans_400Regular",
		width: "90%",
		height: 45,
		paddingHorizontal: 15,
	},
	footerLink: {
		alignSelf: 'flex-start',
		marginLeft: 15,
		marginBottom: 30,
		flexDirection: 'row',
		alignItems: 'center'
	},
	footerText: {
		fontFamily: 'NunitoSans_400Regular',
		fontSize: 15,
		color: '#484848',
		marginRight: 5
	},
	buttonContainer: {
		justifyContent: "flex-end",
		alignItems: "center",
		paddingBottom: 10,
	},
	error: {
		fontFamily: 'NunitoSans_400Regular',
		fontSize: 12,
		color: '#ff5a60',
		marginLeft: 15
	}
});

const mapDispatchToProps = (dispatch) => ({
	dispatchLoginAction: (cpf, password, onSuccess, onError) =>
		dispatch(loginUser({ cpf, password }, onSuccess, onError)),
	dispatchGetUserAction: (id) => dispatch(getUser(id))
});

export default connect(null, mapDispatchToProps)(LoginPage);
