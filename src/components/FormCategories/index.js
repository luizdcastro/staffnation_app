import React, { useEffect, useState, useRef } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";

import { Ionicons } from "@expo/vector-icons";
import GradientButton from "../GradientButton";
import { ScrollView } from "react-native-gesture-handler";
import SelectorCategory from "../SelectorCategory";
import _ from "lodash";

const FormCategories = ({
	setEmailPhoneFormFilled,
	setCategoriesFormFilled,
}) => {
	const [userCategories, setUserCategories] = useState([]);

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

	const selectedCategories = _.filter(categories, ["selected", true]);

	return (
		<View style={styles.container}>
			<TouchableOpacity
				style={styles.buttonClose}
				onPress={() => setEmailPhoneFormFilled(false)}
			>
				<Ionicons name="ios-arrow-back" size={30} color="#242424" />
			</TouchableOpacity>
			<View style={{ flex: 1, justifyContent: "space-between" }}>
				<Text style={styles.title}>
					Selecione até duas categorias que você gostaria trabalhar
				</Text>
				<View style={{ flex: 1 }}>
					<ScrollView style={{ marginVertical: 20 }}>
						<SelectorCategory
							title="Segurança"
							setCardExpanded={setSegCardExpanded}
							setCertificate={setSegCertificate}
							setExperience={setSegExperience}
							cardExpanded={segCardExpanded}
							experience={segExperience}
							certificate={segCertificate}
						/>
						<SelectorCategory
							title="Bar"
							setCardExpanded={setBarCardExpanded}
							setCertificate={setBarCertificate}
							setExperience={setBarExperience}
							cardExpanded={barCardExpanded}
							experience={barExperience}
							certificate={barCertificate}
						/>
						<SelectorCategory
							title="Hostess"
							setCardExpanded={setHostCardExpanded}
							setCertificate={setHostCertificate}
							setExperience={setHostExperience}
							cardExpanded={hostCardExpanded}
							experience={hostExperience}
							certificate={hostCertificate}
						/>
						<SelectorCategory
							title="Limpeza"
							setCardExpanded={setLimpCardExpanded}
							setCertificate={setLimpCertificate}
							setExperience={setLimpExperience}
							cardExpanded={limpCarExpanded}
							experience={limpExprience}
							certificate={limpCertificate}
						/>
						<SelectorCategory
							title="Garçom"
							setCardExpanded={setGacCardExpanded}
							setCertificate={setGarCertificate}
							setExperience={setGarExperience}
							cardExpanded={garCardExpanded}
							experience={garExperience}
							certificate={garCertificate}
						/>
					</ScrollView>
					<View style={styles.buttonContainer}>
						<GradientButton
							title="Continuar"
							gradient={["#FFE45C", "#FFC900"]}
							onPress={() => setCategoriesFormFilled(true)}
						/>
					</View>
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
	containerCategory: {
		flex: 1,
	},
	cardCategory: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		width: "90%",
		height: 60,
		borderTopLeftRadius: 5,
		borderTopRightRadius: 5,
		paddingHorizontal: 20,
		marginTop: 20,
		backgroundColor: "#fff",
		elevation: 1,
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 1,
		},
		shadowOpacity: 0.18,
		shadowRadius: 1.0,
	},
	experience: {
		width: "90%",
		height: 175,
		paddingHorizontal: 15,
		backgroundColor: "#fff",
		elevation: 1,
		shadowColor: "#000",
		borderBottomLeftRadius: 5,
		borderBottomRightRadius: 5,
		shadowOffset: {
			width: 0,
			height: 1,
		},
		shadowOpacity: 0.18,
		shadowRadius: 1.0,
	},
	titleCategory: {
		fontSize: 17,
		fontFamily: "Montserrat_500Medium",
	},
	titleExperience: {
		fontSize: 15,
		fontFamily: "Montserrat_400Regular",
		marginBottom: 10,
	},
	textExperience: {
		fontSize: 17,
		fontFamily: "Montserrat_500Medium",
		textAlign: "center",
	},
	textCetificate: {
		fontSize: 17,
		fontFamily: "Montserrat_500Medium",
		textAlign: "center",
		paddingHorizontal: 10,
	},
});

export default FormCategories;
