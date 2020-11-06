import React, { useState } from "react";
import {
	StyleSheet,
	View,
	Text,
	TextInput,
	TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import { TextInputMask } from "react-native-masked-text";
import { Ionicons } from "@expo/vector-icons";

import GradientButton from "../GradientButton";

const FormEmailPhone = ({
	setAdressFormFilled,
	setEmailPhoneFormFilled,
	email,
	setEmail,
	phone,
	setPhone,
}) => {
	const navigation = useNavigation();

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
					onPress={() => setAdressFormFilled(false)}
				>
					<Ionicons name="ios-arrow-back" size={30} color="#00A699" />
				</TouchableOpacity>
				<TouchableOpacity
					style={styles.buttonClose}
					onPress={() => navigation.navigate("AuthPage")}
				>
					<Ionicons name="ios-close" size={42} color="#00A699" />
				</TouchableOpacity>
			</View>
			<View style={{ flex: 1, justifyContent: "space-between" }}>
				<Text style={styles.title}>Informe seu email e telefone com DDD</Text>
				<View style={{ flexDirection: "row", alignItems: "center" }}>
					<TextInput
						style={styles.input}
						autoFocus={true}
						keyboardType="email-address"
						autoCapitalize="none"
						placeholder="Email"
						value={email}
						onChangeText={(value) => setEmail(value)}
						maxLength={30}
						blurOnSubmit={false}
					/>
					{email.length >= 1 ? (
						<TouchableOpacity onPress={() => setEmail("")}>
							<Ionicons name="ios-close-circle" size={25} color="#a8a8a8" />
						</TouchableOpacity>
					) : null}
				</View>
				<View style={{ flexDirection: "row", alignItems: "center" }}>
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
					{phone.length >= 1 ? (
						<TouchableOpacity onPress={() => setPhone("")}>
							<Ionicons name="ios-close-circle" size={25} color="#a8a8a8" />
						</TouchableOpacity>
					) : null}
				</View>

				<View style={styles.buttonContainer}>
					{email.includes("@") & email.includes(".") & (phone.length >= 14) ? (
						<GradientButton
							title="Continuar"
							gradient={["#00A699", "#00A699"]}
							onPress={() => setEmailPhoneFormFilled(true)}
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
		fontSize: 24,
		fontFamily: "NunitoSans_400Regular",
		color: "#484848",
		marginTop: 10,
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
	buttonContainer: {
		justifyContent: "flex-end",
		alignItems: "center",
		paddingBottom: 20,
	},
});

export default FormEmailPhone;
