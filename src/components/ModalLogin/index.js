import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import {
	StyleSheet,
	View,
	Text,
	TextInput,
	TouchableOpacity,
	Keyboard,
	KeyboardAvoidingView,
	Platform,
} from "react-native";
import * as Animatable from "react-native-animatable";
import { Ionicons } from "@expo/vector-icons";
import Feather from "react-native-vector-icons/Feather";
import GradientButton from "../GradientButton";
import { loginUser } from "../../redux/actions/authActions";

const ModalLogin = ({
	emailVisible,
	passwordVisible,
	setPasswordVisible,
	setEmailVisible,
	dispatchLoginAction,
}) => {
	const [error, setError] = useState("");
	const [data, setData] = useState({
		email: "",
		password: "",
		check_textInputChange: false,
		secureTextEntry: true,
	});

	const emailInputChange = (val) => {
		if (val.length !== 0) {
			setData({
				...data,
				email: val,
				check_textInputChange: true,
			});
		} else {
			setData({
				...data,
				email: val,
				check_textInputChange: false,
			});
		}
	};

	const passwordInputChange = (val) => {
		setData({
			...data,
			password: val,
		});
	};

	const updatePasswordTextEntry = () => {
		setData({
			...data,
			secureTextEntry: !data.secureTextEntry,
		});
	};

	useEffect(() => {
		const keyboardDidShowListener = Keyboard.addListener(
			"keyboardDidShow",
			() => {}
		);
		const keyboardDidHideListenerI = Keyboard.addListener(
			"keyboardDidHide",
			() => {
				setEmailVisible(false);
			}
		);
		const keyboardDidHideListenerII = Keyboard.addListener(
			"keyboardDidHide",
			() => {
				setPasswordVisible(false);
			}
		);
		return () => {
			keyboardDidHideListenerI.remove();
			keyboardDidHideListenerII.remove();
			keyboardDidShowListener.remove();
		};
	}, []);

	const handleLogin = (event) => {
		event.preventDefault();
		dispatchLoginAction(
			data.email,
			data.password,
			(response) => console.log(response),
			(error) => {
				setError(error);
				console.log(error);
			}
		);
	};

	return (
		<KeyboardAvoidingView
			behavior={Platform.OS === "ios" ? "padding" : "height"}
			style={styles.container}
		>
			{emailVisible ? (
				<Animatable.View animation="fadeInUpBig" style={styles.modalView}>
					<View style={styles.buttonCloseContainer}>
						<TouchableOpacity
							onPress={() => setEmailVisible(false)}
							style={styles.buttonClose}
						>
							<Ionicons name="ios-close" size={35} color="#242424" />
						</TouchableOpacity>
					</View>
					<View style={styles.modalTextContent}>
						<Text style={styles.title}>Digite seu email</Text>
						<View style={styles.inputContainer}>
							<TextInput
								style={styles.input}
								autoCorrect={false}
								autoCapitalize="none"
								autoFocus={true}
								keyboardType="email-address"
								textContentType="emailAddress"
								placeholder="Email"
								selectionColor="#242424"
								underlineColorAndroid="transparent"
								onChangeText={(val) => emailInputChange(val)}
								value={data.email}
							/>
							{data.email.includes("@") & data.email.includes(".") ? (
								<Animatable.View animation="bounceIn">
									<Feather name="check-circle" color="#242424" size={20} />
								</Animatable.View>
							) : null}
						</View>
					</View>
					<View style={styles.modalButtonContent}>
						{data.email.includes("@") & data.email.includes(".") ? (
							<GradientButton
								onPress={() => {
									setEmailVisible(false);
									setPasswordVisible(true);
								}}
								gradient={["#FFE45C", "#FFC900"]}
								title="Entrar"
							/>
						) : (
							<GradientButton
								onPress={() => {
									setEmailVisible(false);
									setPasswordVisible(true);
								}}
								gradient={["#e9e9e9", "#ededed"]}
								title="Entrar"
								textStyle={{ color: "#939393" }}
							/>
						)}
					</View>
				</Animatable.View>
			) : passwordVisible ? (
				<Animatable.View animation="fadeInUp" style={styles.modalView}>
					<View style={styles.buttonCloseContainer}>
						<TouchableOpacity
							onPress={() => setPasswordVisible(false)}
							style={styles.buttonClose}
						>
							<Ionicons name="ios-close" size={35} color="black" />
						</TouchableOpacity>
					</View>
					<View style={styles.modalTextContent}>
						<Text style={styles.title}>Insira a senha de acesso</Text>
						<View style={styles.inputContainer}>
							<TextInput
								style={styles.input}
								autoCorrect={false}
								autoCapitalize="none"
								autoFocus={true}
								placeholder="Senha"
								selectionColor="#242424"
								underlineColorAndroid="transparent"
								keyboardType="default"
								secureTextEntry={true}
								onChangeText={(val) => passwordInputChange(val)}
								value={data.password}
							/>
							<TouchableOpacity onPress={updatePasswordTextEntry}>
								{data.secureTextEntry ? (
									<Feather name="eye-off" color="grey" size={20} />
								) : (
									<Feather name="eye" color="grey" size={20} />
								)}
							</TouchableOpacity>
						</View>
					</View>
					<View style={styles.modalButtonContent}>
						{data.password.length >= 6 ? (
							<GradientButton
								onPress={handleLogin}
								gradient={["#FFE45C", "#FFC900"]}
								title="Entrar"
							/>
						) : (
							<GradientButton
								onPress={() => {
									setEmailVisible(false);
									setPasswordVisible(true);
								}}
								gradient={["#e9e9e9", "#f1f1f1"]}
								title="Entrar"
								textStyle={{ color: "#939393" }}
							/>
						)}
					</View>
				</Animatable.View>
			) : null}
		</KeyboardAvoidingView>
	);
};

const styles = StyleSheet.create({
	modalView: {
		justifyContent: "flex-end",
		width: "100%",
		height: 240,
		backgroundColor: "#fcfcfc",
		borderTopEndRadius: 20,
		borderTopStartRadius: 20,
	},
	modalTextContent: {
		flex: 2,
		alignItems: "flex-start",
		paddingLeft: 15,
	},
	title: {
		fontSize: 23,
		marginBottom: 25,
		fontFamily: "Montserrat_400Regular",
	},
	input: {
		fontSize: 23,
		color: "#242424",
		fontFamily: "Montserrat_500Medium",
		width: "97%",
		height: 45,
	},
	inputContainer: {
		flexDirection: "row",
		alignItems: "center",
		width: "90%",
	},
	buttonCloseContainer: {
		alignItems: "flex-end",
	},
	buttonClose: {
		width: 90,
		height: 50,
		justifyContent: "flex-end",
		alignItems: "center",
	},
	modalButtonContent: {
		flex: 1,
		alignItems: "center",
		justifyContent: "flex-end",
		paddingBottom: Platform.OS === "android" ? 15 : 10,
	},
	button: {
		width: "95%",
		height: 50,
		justifyContent: "center",
		alignItems: "center",
		flexDirection: "row",
		borderRadius: 5,
	},
	gradientButton: {
		width: "100%",
		height: 50,
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 5,
	},
	textButton: {
		color: "#262833",
		textTransform: "uppercase",
		fontSize: 14,
		fontFamily: "Montserrat_500Medium",
	},
});

const mapDispatchToProps = (dispatch) => ({
	dispatchLoginAction: (email, password, onSuccess, onError) =>
		dispatch(loginUser({ email, password }, onSuccess, onError)),
});

export default connect(null, mapDispatchToProps)(ModalLogin);
