import React, { useState } from "react";
import {
	StyleSheet,
	View,
	Text,
	TextInput,
	TouchableOpacity,
} from "react-native";

import { TextInputMask } from "react-native-masked-text";
import { Ionicons } from "@expo/vector-icons";

import GradientButton from "../GradientButton";

const FormEmailPhone = ({ setAdressFormFilled, setEmailPhoneFormFilled }) => {
	const [email, setEmail] = useState("");
	const [phone, setPhone] = useState("");

	return (
		<View style={styles.container}>
			<TouchableOpacity
				style={styles.buttonClose}
				onPress={() => setAdressFormFilled(false)}
			>
				<Ionicons name="ios-arrow-back" size={30} color="#242424" />
			</TouchableOpacity>
			<View style={{ flex: 1, justifyContent: "space-between" }}>
				<Text style={styles.title}>Informe seu email e telefone com DDD</Text>
				<View>
					<TextInput
						style={styles.input}
						autoFocus={true}
						keyboardType="default"
						placeholder="Email"
						value={email}
						onChangeText={(value) => setEmail(value)}
						maxLength={30}
						blurOnSubmit={false}
					/>
				</View>
				<TextInputMask
					style={styles.input}
					placeholder="Telefone"
					type={"cel-phone"}
					options={{
						maskType: "BRL",
						withDDD: true,
						dddMask: "(99) ",
					}}
					value={phone}
					onChangeText={(value) => setPhone(value)}
					blurOnSubmit={false}
				/>
				<View style={styles.buttonContainer}>
					{email.includes("@") & email.includes(".") & (phone.length >= 14) ? (
						<GradientButton
							title="Continuar"
							gradient={["#FFE45C", "#FFC900"]}
							onPress={() => setEmailPhoneFormFilled(true)}
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
		width: 50,
		height: 50,
		marginTop: 40,
		paddingLeft: 15,
	},
	title: {
		fontSize: 23,
		fontFamily: "Montserrat_400Regular",
		color: "#242424",
		marginTop: 25,
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

export default FormEmailPhone;