import React, { useState } from "react";
import {
	StyleSheet,
	View,
	Text,
	TextInput,
	TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import { Ionicons } from "@expo/vector-icons";
import Feather from "react-native-vector-icons/Feather";
import GradientButton from "../GradientButton";

const PasswordForm = ({ setCategoriesFormFilled }) => {
	const navigation = useNavigation();
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [secureTextEntry, setSecureTextEntry] = useState(true);

	return (
		<View style={styles.container}>
			<View
				style={{
					flexDirection: "row",
					justifyContent: "space-between",
					alignItems: "center",
				}}
			>
				<TouchableOpacity
					style={styles.buttonClose}
					onPress={() => setCategoriesFormFilled(false)}
				>
					<Ionicons name="ios-arrow-back" size={30} color="#242424" />
				</TouchableOpacity>
				<TouchableOpacity
					style={styles.buttonClose}
					onPress={() => navigation.navigate("AuthPage")}
				>
					<Ionicons name="ios-close" size={42} color="#242424" />
				</TouchableOpacity>
			</View>
			<View style={{ flex: 1, justifyContent: "space-between" }}>
				<Text style={styles.title}>Digite sua senha de acesso </Text>
				<View style={{ flexDirection: "row", alignItems: "center" }}>
					<TextInput
						style={styles.input}
						placeholder="Senha"
						autoCorrect={false}
						autoFocus={true}
						autoCapitalize="none"
						selectionColor="#242424"
						underlineColorAndroid="transparent"
						keyboardType="number-pad"
						secureTextEntry={secureTextEntry}
						onChangeText={(val) => setPassword(val)}
						value={password}
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
				<View style={{ flexDirection: "row", alignItems: "center" }}>
					<TextInput
						style={styles.input}
						placeholder="Confirmar senha"
						autoCorrect={false}
						autoCapitalize="none"
						selectionColor="#242424"
						underlineColorAndroid="transparent"
						keyboardType="number-pad"
						secureTextEntry={secureTextEntry}
						onChangeText={(val) => setConfirmPassword(val)}
						value={confirmPassword}
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
					{(password.length >= 6) & (password === confirmPassword) ? (
						<GradientButton
							title="Cadastrar"
							gradient={["#FFE45C", "#FFC900"]}
							onPress={() => {}}
						/>
					) : (
						<GradientButton
							onPress={() => {}}
							gradient={["#d7d7d7", "#e0e0e0"]}
							title="Cadastrar"
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
		marginTop: 35,
		paddingHorizontal: 15,
	},
	title: {
		fontSize: 23,
		fontFamily: "Montserrat_400Regular",
		color: "#242424",
		marginTop: 10,
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
		paddingBottom: 20,
	},
});

export default PasswordForm;
