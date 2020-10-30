import React, { useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";

import { Ionicons } from "@expo/vector-icons";
import GradientButton from "../GradientButton";
import { ScrollView } from "react-native-gesture-handler";
import SelectorCategory from "../SelectorCategory";
import { useNavigation } from "@react-navigation/native";

import _ from "lodash";

const FormCategories = ({
	setEmailPhoneFormFilled,
	setCategoriesFormFilled,
}) => {
	const navigation = useNavigation();

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
							categoriesLimit={selectedCategories.length}
						/>
						<SelectorCategory
							title="Bar"
							setCardExpanded={setBarCardExpanded}
							setCertificate={setBarCertificate}
							setExperience={setBarExperience}
							cardExpanded={barCardExpanded}
							experience={barExperience}
							certificate={barCertificate}
							categoriesLimit={selectedCategories.length}
						/>
						<SelectorCategory
							title="Hostess"
							setCardExpanded={setHostCardExpanded}
							setCertificate={setHostCertificate}
							setExperience={setHostExperience}
							cardExpanded={hostCardExpanded}
							experience={hostExperience}
							certificate={hostCertificate}
							categoriesLimit={selectedCategories.length}
						/>
						<SelectorCategory
							title="Limpeza"
							setCardExpanded={setLimpCardExpanded}
							setCertificate={setLimpCertificate}
							setExperience={setLimpExperience}
							cardExpanded={limpCarExpanded}
							experience={limpExprience}
							certificate={limpCertificate}
							categoriesLimit={selectedCategories.length}
						/>
						<SelectorCategory
							title="Garçom"
							setCardExpanded={setGacCardExpanded}
							setCertificate={setGarCertificate}
							setExperience={setGarExperience}
							cardExpanded={garCardExpanded}
							experience={garExperience}
							certificate={garCertificate}
							categoriesLimit={selectedCategories.length}
						/>
					</ScrollView>
					<View style={styles.buttonContainer}>
						{selectedCategories.length >= 1 ? (
							<GradientButton
								title="Continuar"
								gradient={["#FFE45C", "#FFC900"]}
								onPress={() => setCategoriesFormFilled(true)}
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
		marginTop: 10,
		paddingBottom: 25,
	},
});

export default FormCategories;
