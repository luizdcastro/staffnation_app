import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

import { TextInputMask } from "react-native-masked-text";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import * as Animatable from "react-native-animatable";

import GradientButton from "../../components/GradientButton";
import { TextInput } from "react-native-gesture-handler";

const FormAddress = ({ setNameDateFormFilled, setAdressFormFilled }) => {
	const [cep, setCep] = useState("");
	const [address, setAddress] = useState({});
	const [number, setNumber] = useState("");
	const [error, setError] = useState(false);

	const getUserAddress = () => {
		fetch(`https://viacep.com.br/ws/${cep}/json/`)
			.then((res) => res.json())
			.then((data) => {
				if (data.erro) {
					setError(true);
					setAddress({});
				} else {
					setError(false);
					setAddress({
						cep: data.cep,
						street: data.logradouro,
						neighborhood: data.bairro,
						city: data.localidade,
						state: data.uf,
						number: "",
					});
				}
			});
	};

	useEffect(() => {
		if (cep.length >= 8) {
			getUserAddress();
		}
	}, [cep]);

	useEffect(() => {
		if (number.length) {
			setAddress({ ...address, number: number });
		}
	}, [number]);

	return (
		<View style={styles.container}>
			<TouchableOpacity
				style={styles.buttonClose}
				onPress={() => setNameDateFormFilled(false)}
			>
				<Ionicons name="ios-arrow-back" size={30} color="#242424" />
			</TouchableOpacity>
			<View style={{ flex: 1, justifyContent: "space-between" }}>
				<Text style={styles.title}>
					Digite seu CEP para localizarmos seu endereço
				</Text>
				<View style={{ flexDirection: "row", alignItems: "center" }}>
					<TextInputMask
						style={[
							error
								? [styles.input, { width: "75%", color: "#ff5555" }]
								: [styles.input, { width: "75%" }],
						]}
						type={"zip-code"}
						value={cep}
						onChangeText={(value) => setCep(value.replace("-", ""))}
						blurOnSubmit={false}
						autoFocus={true}
						placeholder="CEP"
					/>
				</View>
				{address.cep ? (
					<Animatable.View animation="fadeInUp" style={styles.addressContainer}>
						<View style={{ flexDirection: "row", alignItems: "center" }}>
							<Text style={styles.addressText}>{`${address.street}, Nº`}</Text>
							<TextInput
								style={styles.inputNumber}
								autoFocus={true}
								keyboardType="number-pad"
								blurOnSubmit={false}
								value={number}
								onChangeText={(value) => setNumber(value)}
								maxLength={6}
							/>
						</View>
						<View>
							<Text
								style={styles.addressText}
							>{`${address.neighborhood}, ${address.city} - ${address.state}`}</Text>
						</View>
					</Animatable.View>
				) : error ? (
					<View style={styles.errorContainer}>
						<MaterialIcons name="error" size={20} color="#ff5555" />
						<Text style={styles.errorText}>CEP inválido</Text>
					</View>
				) : null}

				<View style={styles.buttonContainer}>
					{address.number?.length >= 1 ? (
						<GradientButton
							title="Continuar"
							gradient={["#FFE45C", "#FFC900"]}
							onPress={() => setAdressFormFilled(true)}
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
		position: "relative",
	},
	inputClaear: {
		width: 50,
		height: 50,
	},
	addressContainer: {
		paddingLeft: 15,
	},
	addressText: {
		fontFamily: "Montserrat_400Regular",
		color: "#242424",
		fontSize: 22,
	},
	inputNumber: {
		fontFamily: "Montserrat_400Regular",
		color: "#242424",
		fontSize: 20,
		paddingLeft: 15,
	},
	errorContainer: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "flex-start",
		paddingHorizontal: 13,
		position: "absolute",
		top: "56%",
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

export default FormAddress;