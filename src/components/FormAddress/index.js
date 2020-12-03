import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import {
	Container,
	ModalContent,
	RegisterContent,
	Title,
	InputContainer,
	NameInput,
	PasswordInput,
	EmailInput,
	ErrorMessage,
} from './styles'

import { useNavigation } from "@react-navigation/native";

import { TextInputMask } from "react-native-masked-text";
import { AntDesign } from '@expo/vector-icons';

import * as Animatable from "react-native-animatable";

import { TextInput } from "react-native-gesture-handler";
import KeyboardButton from '../../components/KeyboardButton'

const FormAddress = ({
	address,
	setAddress,
	setIsAddressFilled,
	setIsNameDateFilled
}) => {
	const navigation = useNavigation();
	const [cep, setCep] = useState("");
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
		<RegisterContent>
			<View>
				<AntDesign
					name="arrowleft"
					size={30}
					color="grey"
					style={{ alignSelf: 'flex-start', marginLeft: '4%' }}
					onPress={() => setIsNameDateFilled(false)}
				/>
				<Title>Digite seu CEP para localizarmos seu endereço</Title>
				<InputContainer>
					<TextInputMask
						style={[
							error
								? [styles.input, { color: "#BA000D" }]
								: [styles.input,],
						]}
						type={"zip-code"}
						value={cep}
						onChangeText={(value) => setCep(value.replace("-", ""))}
						blurOnSubmit={false}
						autoFocus={true}
						placeholder="CEP"
					/>
				</InputContainer>
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
			) : null}
			<View>
				{error ? <ErrorMessage>CEP inválido</ErrorMessage> : null}
				{!address.number?.length >= 1 ?
					<KeyboardButton
						name="Continuar"
						textColor="grey"
						borderColor="grey"
					/>
					:
					<KeyboardButton
						name="Continuar"
						textColor="#523BE4"
						borderColor="grey"
						onPress={() => setIsAddressFilled(true)}
					/>
				}
			</View>
		</RegisterContent >
	);
};

const styles = StyleSheet.create({
	input: {
		fontSize: 22,
		fontFamily: "NunitoSans_400Regular",
		width: "75%",
		height: 35,
	},
	addressContainer: {
		paddingLeft: 15,
	},
	addressText: {
		fontFamily: "NunitoSans_400Regular",
		color: "#484848",
		fontSize: 20,
	},
	inputNumber: {
		fontFamily: "NunitoSans_400Regular",
		fontSize: 20,
		paddingLeft: 15,
	},
});

export default FormAddress;
