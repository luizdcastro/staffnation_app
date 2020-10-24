import React, { useState, useEffect } from "react";
import {
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
	ImageBackground,
	Modal,
} from "react-native";
import * as Animatable from "react-native-animatable";
import { LinearGradient } from "expo-linear-gradient";
import ModalLogin from "../../components/ModalLogin";

const AuthPage = ({ navigation }) => {
	const [emailVisible, setEmailVisible] = useState(false);
	const [passwordVisible, setPasswordVisible] = useState(false);
	const [modalIsVisible, setModalIsVisible] = useState(false);

	useEffect(() => {
		if (emailVisible || passwordVisible) {
			setModalIsVisible(true);
		} else {
			setModalIsVisible(false);
		}
	}, [emailVisible, passwordVisible]);

	return (
		<View style={styles.container}>
			<ImageBackground
				source={require("../../assets/images/barman_01.png")}
				style={styles.background}
			>
				<Modal transparent={true} visible={modalIsVisible}>
					<View style={styles.modal}>
						<ModalLogin
							emailVisible={emailVisible}
							passwordVisible={passwordVisible}
							setPasswordVisible={setPasswordVisible}
							setEmailVisible={setEmailVisible}
						/>
					</View>
				</Modal>
				<Animatable.View style={{ flex: 1 }} animation="fadeInUpBig">
					<View style={styles.buttonContainer}>
						<TouchableOpacity
							onPress={() => {
								navigation.navigate("RegisterPage");
							}}
							style={[styles.buttonRegister, { backgroundColor: "transparent" }]}
						>
							<LinearGradient
								style={styles.gradientButton}
								colors={["#FFE45C", "#FFC900"]}
							>
								<Text style={styles.textButtonRegister}>Criar sua conta</Text>
							</LinearGradient>
						</TouchableOpacity>

						<TouchableOpacity
							style={styles.buttonLogin}
							onPress={() => navigation.navigate("LoginPage")}
						>
							<Text style={styles.textButtonLogin}>Já tenho conta</Text>
						</TouchableOpacity>
					</View>
				</Animatable.View>
			</ImageBackground>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	background: {
		flex: 1,
		resizeMode: "cover",
	},
	logo: {
		fontSize: 35,
		fontFamily: "Montserrat_900Black",
		color: "#ececec",
	},
	buttonContainer: {
		flex: 1,
		justifyContent: "flex-end",
		alignItems: "center",
		marginBottom: 20,
	},
	modal: {
		justifyContent: "flex-end",
		flex: 1,
	},
	buttonLogin: {
		width: "90%",
		height: 50,
		justifyContent: "center",
		alignItems: "center",
		flexDirection: "row",
		borderRadius: 5,
		backgroundColor: "#242424",
		marginTop: 10,
	},
	gradientButton: {
		width: "100%",
		height: 50,
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 5,
	},
	textButtonLogin: {
		color: "#D4DAE0",
		textTransform: "uppercase",
		fontSize: 14,
		fontFamily: "Montserrat_500Medium",
	},
	buttonRegister: {
		marginTop: 15,
		width: "90%",
		height: 50,
		borderRadius: 5,
		justifyContent: "center",
		alignItems: "center",
		flexDirection: "row",
	},
	textButtonRegister: {
		color: "#262833",
		textTransform: "uppercase",
		fontSize: 14,
		fontFamily: "Montserrat_500Medium",
	},
});

export default AuthPage;
