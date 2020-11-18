import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import {
	KeyboardAvoidingView,
	StyleSheet,
	ScrollView,
	View,
	TouchableOpacity,
	ActivityIndicator,
	Text,
	StatusBar,
	TextInput,
	Platform,
} from "react-native";

import _ from "lodash";
import { Ionicons } from "@expo/vector-icons";
import Feather from "react-native-vector-icons/Feather";
import * as Animatable from "react-native-animatable";

import GradientButton from "../../components/GradientButton";
import FormCpf from "../../components/FormCpf";
import FormNamedate from "../../components/FormNameDate";
import FormAdress from "../../components/FormAddress";
import FormEmailPhone from "../../components/FormEmailPhone";
import SelectorCategory from "../../components/SelectorCategory";
import { registerUser } from "../../redux/actions/authActions";
import { getUser } from "../../redux/actions/userActions"

const RegisterPage = ({ navigation, dispatchRegisterUser, dispatchGetUserAction }) => {
	//Getting data from child components
	const [cpfFormFilled, setCpfFormFilled] = useState(false);
	const [nameDateFormFilled, setNameDateFormFilled] = useState(false);
	const [addressFormFilled, setAdressFormFilled] = useState(false);
	const [emailPhoneFormFilled, setEmailPhoneFormFilled] = useState(false);
	const [categoriesFormFilled, setCategoriesFormFilled] = useState(false);
	const [passwordFormFilled, setPasswordFormFilled] = useState(false);

	//Register data function
	const [userCpf, setUserCpf] = useState("");
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [phone, setPhone] = useState("");
	const [date, setDate] = useState("");
	const [address, setAddress] = useState({});
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [secureTextEntry, setSecureTextEntry] = useState(true);
	const [error, setError] = useState(false);
	const [errorMessage, setErrorMessage] = useState('')
	const [loading, setLoading] = useState(false);

	//Select categories data from object
	const [segCardExpanded, setSegCardExpanded] = useState(false);
	const [segExperience, setSegExperience] = useState(0);
	const [segCertificate, setSegCertificate] = useState(false);
	const [barCardExpanded, setBarCardExpanded] = useState(false);
	const [barExperience, setBarExperience] = useState(0);
	const [barCertificate, setBarCertificate] = useState(false);
	const [hostCardExpanded, setHostCardExpanded] = useState(false);
	const [hostExperience, setHostExperience] = useState(0);
	const [hostCertificate, setHostCertificate] = useState(false);
	const [limpCarExpanded, setLimpCardExpanded] = useState(false);
	const [limpExprience, setLimpExperience] = useState(0);
	const [limpCertificate, setLimpCertificate] = useState(false);
	const [garCardExpanded, setGacCardExpanded] = useState(false);
	const [garExperience, setGarExperience] = useState(0);
	const [garCertificate, setGarCertificate] = useState(false);

	const categories = [
		{
			id: 1,
			name: "segurança",
			certificado: segCertificate,
			experiencia: segExperience,
			selected: segCardExpanded,
		},
		{
			id: 2,
			name: "bar",
			certificado: barCertificate,
			experiencia: barExperience,
			selected: barCardExpanded,
		},
		{
			id: 3,
			name: "hostess",
			certificado: hostCertificate,
			experiencia: hostExperience,
			selected: hostCardExpanded,
		},
		{
			id: 4,
			name: "limpeza",
			certificado: limpCertificate,
			experiencia: limpExprience,
			selected: limpCarExpanded,
		},
		{
			id: 5,
			name: "garçom",
			certificado: garCertificate,
			experiencia: garExperience,
			selected: garCardExpanded,
		},
	];

	const userCategories = _.filter(categories, ["selected", true]);

	const handleRegistration = (event) => {
		event.preventDefault();
		setLoading(true)
		dispatchRegisterUser(
			userCpf,
			name,
			date,
			address,
			email,
			phone,
			userCategories,
			password,
			confirmPassword,
			(response) => {
				console.log('registered!');
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

	console.log(errorMessage)

	return (
		<KeyboardAvoidingView
			behavior={Platform.OS === "ios" ? "padding" : ""}
			style={styles.container}
		>
			<StatusBar barStyle='dark-content' backgroundColor='#fafafa' />

			{!cpfFormFilled ? (
				<FormCpf
					setCpfFormFilled={setCpfFormFilled}
					userCpf={userCpf}
					setUserCpf={setUserCpf}
				/>
			) : cpfFormFilled & !nameDateFormFilled ? (
				<FormNamedate
					setCpfFormFilled={setCpfFormFilled}
					setNameDateFormFilled={setNameDateFormFilled}
					name={name}
					setName={setName}
					date={date}
					setDate={setDate}
				/>
			) : nameDateFormFilled & !addressFormFilled ? (
				<FormAdress
					setNameDateFormFilled={setNameDateFormFilled}
					setAdressFormFilled={setAdressFormFilled}
					address={address}
					setAddress={setAddress}
				/>
			) : addressFormFilled & !emailPhoneFormFilled ? (
				<FormEmailPhone
					setAdressFormFilled={setAdressFormFilled}
					setEmailPhoneFormFilled={setEmailPhoneFormFilled}
					email={email}
					setEmail={setEmail}
					phone={phone}
					setPhone={setPhone}
				/>
			) : emailPhoneFormFilled & !categoriesFormFilled ? (
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
							onPress={() => setEmailPhoneFormFilled(false)}
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
							Selecione até duas categorias que você gostaria trabalhar
						</Text>
						<View style={{ flex: 1 }}>
							<ScrollView style={{ marginVertical: 10 }}>
								<SelectorCategory
									title="Segurança"
									setCardExpanded={setSegCardExpanded}
									setCertificate={setSegCertificate}
									setExperience={setSegExperience}
									cardExpanded={segCardExpanded}
									experience={segExperience}
									certificate={segCertificate}
									categoriesLimit={userCategories.length}
								/>
								<SelectorCategory
									title="Bar"
									setCardExpanded={setBarCardExpanded}
									setCertificate={setBarCertificate}
									setExperience={setBarExperience}
									cardExpanded={barCardExpanded}
									experience={barExperience}
									certificate={barCertificate}
									categoriesLimit={userCategories.length}
								/>
								<SelectorCategory
									title="Hostess"
									setCardExpanded={setHostCardExpanded}
									setCertificate={setHostCertificate}
									setExperience={setHostExperience}
									cardExpanded={hostCardExpanded}
									experience={hostExperience}
									certificate={hostCertificate}
									categoriesLimit={userCategories.length}
								/>
								<SelectorCategory
									title="Limpeza"
									setCardExpanded={setLimpCardExpanded}
									setCertificate={setLimpCertificate}
									setExperience={setLimpExperience}
									cardExpanded={limpCarExpanded}
									experience={limpExprience}
									certificate={limpCertificate}
									categoriesLimit={userCategories.length}
								/>
								<SelectorCategory
									title="Garçom"
									setCardExpanded={setGacCardExpanded}
									setCertificate={setGarCertificate}
									setExperience={setGarExperience}
									cardExpanded={garCardExpanded}
									experience={garExperience}
									certificate={garCertificate}
									categoriesLimit={userCategories.length}
								/>
							</ScrollView>
							<View style={styles.buttonContainer}>
								{userCategories.length >= 1 ? (
									<GradientButton
										title="Continuar"
										gradient={["#00A699", "#00A699"]}
										onPress={() => setCategoriesFormFilled(true)}
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
				</View>
			) : categoriesFormFilled & !passwordFormFilled ? (
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
						<Text style={styles.title}>Digite sua senha de acesso </Text>
						{errorMessage ?
							<Animatable.Text animation="fadeInLeft" style={styles.error}>
								{errorMessage}
							</Animatable.Text>
							: null}
						<View style={{ flexDirection: "row", alignItems: "center" }}>
							<TextInput
								style={styles.input}
								placeholder="Senha"
								autoCorrect={false}
								autoFocus={true}
								autoCapitalize="none"
								selectionColor="#484848"
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
								placeholder="Confirmar senha"
								style={styles.input}
								autoCorrect={false}
								autoCapitalize="none"
								selectionColor="#484848"
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
							{(password.length >= 6) & (password === confirmPassword) & !loading ?
								<GradientButton
									title="Cadastrar"
									gradient={["#00A699", "#00A699"]}
									onPress={handleRegistration}
								/>
								: (password.length <= 6) & confirmPassword.length <= 6 & !loading ?
									<GradientButton
										onPress={() => { }}
										gradient={["#E8E8E8", "#E8E8E8"]}
										title="Cadastrar"
										textStyle={{ color: "#767676" }}
									/>

									: (password.length >= 6) & (password === confirmPassword) & loading ?
										<GradientButton
											onPress={() => { }}
											gradient={["#00A699", "#00A699"]}
											children={<ActivityIndicator style={{ paddingBottom: 15 }} size="large" color="#FAFAFA" animating={loading} />
											}
										/>
										: <GradientButton
											onPress={() => { }}
											gradient={["#E8E8E8", "#E8E8E8"]}
											title="Cadastrar"
											textStyle={{ color: "#767676" }}
										/>
							}
						</View>
					</View>
				</View>
			) : null}
		</KeyboardAvoidingView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fafafa'
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
		marginTop: 10,
		paddingBottom: 25,
	},
	error: {
		fontFamily: 'NunitoSans_400Regular',
		fontSize: 12,
		color: '#ff5a60',
		marginLeft: 15
	}
});

const mapDispatchToProps = (dispatch) => ({
	dispatchRegisterUser: (
		cpf,
		name,
		birthdayDate,
		address,
		email,
		phone,
		categories,
		password,
		confirmPassword,
		onSuccess,
		onError
	) =>
		dispatch(
			registerUser(
				{
					cpf,
					name,
					birthdayDate,
					address,
					email,
					phone,
					categories,
					password,
					confirmPassword,
				},
				onSuccess,
				onError
			)
		),
	dispatchGetUserAction: (id) => dispatch(getUser(id))
});

export default connect(null, mapDispatchToProps)(RegisterPage);
