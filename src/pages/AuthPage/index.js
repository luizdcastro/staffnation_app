import React from "react";
import {
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
	StatusBar,
	ImageBackground,
	Platform,
	Modal
} from "react-native";
import * as Animatable from "react-native-animatable";
import { LinearGradient } from "expo-linear-gradient";

const AuthPage = ({ navigation }) => {
	return (
		<View style={styles.container}>
			{
				Platform.OS === "ios" ?
					<StatusBar barStyle='light-content' animated /> :
					<StatusBar barStyle='light-content' translucent={true} backgroundColor="rgba(0,0,0,0)" animated />

			}
			<ImageBackground
				source={require("../../assets/images/barman_01.png")}
				style={styles.background}
			>
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
								colors={["#00A699", "#00A699"]}
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
		color: "#ececec",
	},
	buttonContainer: {
		flex: 1,
		justifyContent: "flex-end",
		alignItems: "center",
		marginBottom: 25,
	},

	buttonLogin: {
		width: "90%",
		height: 50,
		justifyContent: "center",
		alignItems: "center",
		flexDirection: "row",
		borderRadius: 5,
		marginTop: 10,
		borderColor: '#fafafa',
		borderWidth: 1
	},
	gradientButton: {
		width: "100%",
		height: 50,
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 5,
	},
	textButtonLogin: {
		color: "#fafafa",
		textTransform: "uppercase",
		fontSize: 14,
		fontFamily: "NunitoSans_700Bold",
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
		color: "#fafafa",
		textTransform: "uppercase",
		fontSize: 14,
		fontFamily: "NunitoSans_700Bold",
	},
});

export default AuthPage;
