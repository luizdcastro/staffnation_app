import React, { useEffect, useState } from "react";
import {
	StyleSheet,
	View,
	Text,
	TextInput,
	TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import * as Animatable from "react-native-animatable";
import moment from "moment"
import { TextInputMask } from "react-native-masked-text";
import { Ionicons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";

import GradientButton from "../GradientButton";

const FormNameDate = ({
	setCpfFormFilled,
	setNameDateFormFilled,
	name,
	setName,
	date,
	setDate,
	gender,
	setGender
}) => {
	const navigation = useNavigation();
	const [dateIsValid, setDateIsValid] = useState(true)
	const [genderOptionMan, setGenderOptionMan] = useState(false)
	const [genderOptionWoman, setGenderOptionWoman] = useState(false)
	const [genderOptionTrans, setOptionTrans] = useState(false)

	useEffect(() => {
		if (date.length === 10) {
			const value = moment(date, "DD/MM/YYYY").isValid()
			setDateIsValid(value)
		}

	}, [date, dateIsValid])

	useEffect(() => {
		if (genderOptionMan) {
			setGender('Masculino')
		}
		if (genderOptionWoman) {
			setGender('Feminino')
		}
		if (genderOptionTrans) {
			setGender('Transgênero')
		}
		if (!genderOptionMan & !genderOptionWoman & !genderOptionTrans) {
			setGender('')
		}
	}, [genderOptionTrans, genderOptionMan, genderOptionWoman])

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
					onPress={() => setCpfFormFilled(false)}
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
				<Text style={styles.title}>
					Digite seu nome completo, data de nascimento e gênero
				</Text>
				<View style={{ flexDirection: "row", alignItems: "center" }}>
					<TextInput
						style={styles.input}
						autoFocus={true}
						keyboardType="default"
						placeholder="Nome completo"
						value={name}
						onChangeText={(value) => setName(value)}
						maxLength={30}
						blurOnSubmit={false}
					/>
					{name.length >= 1 ? (
						<TouchableOpacity onPress={() => setName("")}>
							<Ionicons name="ios-close-circle" size={25} color="#a8a8a8" />
						</TouchableOpacity>
					) : null}
				</View>
				<View style={{ flexDirection: "row", alignItems: "center" }}>
					<TextInputMask
						style={styles.input}
						placeholder="Data de nascimento"
						type={"datetime"}
						options={{
							format: "DD/MM/YYYY",
						}}
						value={date}
						onChangeText={(value) => setDate(value)}
						blurOnSubmit={false}
					/>
					{date.length >= 1 ? (
						<TouchableOpacity onPress={() => setDate("")}>
							<Ionicons name="ios-close-circle" size={25} color="#a8a8a8" />
						</TouchableOpacity>
					) : null}
				</View>
				{!dateIsValid & date.length === 10 ? (
					<Animatable.Text animation="fadeInLeft" style={styles.errorText}>
						Data de nascimento inválida
					</Animatable.Text>
				) : null}
				<View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 15 }}>
					<View style={{ alignItems: 'center' }}>
						<Text style={styles.genderText}>Maculino</Text>
						<TouchableOpacity onPress={() => {
							setGenderOptionMan(!genderOptionMan);
							setGenderOptionWoman(false)
							setOptionTrans(false)
						}}>
							{!genderOptionMan ? <Feather name="circle" size={30} color="#00A699" /> :
								<MaterialIcons name="check-circle" size={30} color="#00A699" />}
						</TouchableOpacity>
					</View>
					<View style={{ alignItems: 'center' }}>
						<Text style={styles.genderText}>Feminino</Text>
						<TouchableOpacity onPress={() => {
							setGenderOptionWoman(!genderOptionWoman);
							setGenderOptionMan(false)
							setOptionTrans(false)
						}}>
							{!genderOptionWoman ? <Feather name="circle" size={30} color="#00A699" /> :
								<MaterialIcons name="check-circle" size={30} color="#00A699" />}
						</TouchableOpacity>
					</View>
					<View style={{ alignItems: 'center' }}>
						<Text style={styles.genderText}> Transgênero</Text>
						<TouchableOpacity onPress={() => {
							setOptionTrans(!genderOptionTrans);
							setGenderOptionMan(false)
							setGenderOptionWoman(false)
						}}>
							{!genderOptionTrans ? <Feather name="circle" size={30} color="#00A699" /> :
								<MaterialIcons name="check-circle" size={30} color="#00A699" />}
						</TouchableOpacity>
					</View>
				</View>
				<View style={styles.buttonContainer}>
					{dateIsValid & date.length === 10 & name.length >= 3 & gender.length >= 3 ? (
						<GradientButton
							title="Continuar"
							gradient={["#00A699", "#00A699"]}
							onPress={() => setNameDateFormFilled(true)}
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
	genderText: {
		fontFamily: 'NunitoSans_400Regular',
		fontSize: 18,
		marginBottom: 4,
		color: '#484848'
	},
	buttonContainer: {
		justifyContent: "flex-end",
		alignItems: "center",
		paddingBottom: 15,
	},
	errorContainer: {
		justifyContent: "flex-start",
		paddingHorizontal: 15,
		position: "absolute",
		top: 40,
	},
	errorText: {
		position: 'absolute',
		fontSize: 13,
		color: "#ff5555",
		marginLeft: 15,
		top: '54%'
	},
});

export default FormNameDate;
