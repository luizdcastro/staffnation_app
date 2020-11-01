import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

import { Feather } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import Slider from "@react-native-community/slider";

const SelectorCategory = ({
	title,
	setCardExpanded,
	setCertificate,
	setExperience,
	cardExpanded,
	experience,
	certificate,
	categoriesLimit,
}) => {
	return (
		<View style={styles.containerCategory}>
			<View style={{ justifyContent: "center", alignItems: "center" }}>
				<View style={styles.cardCategory}>
					<Text style={styles.titleCategory}>{title}</Text>
					<TouchableOpacity
						onPress={() => {
							if (categoriesLimit >= 2) {
								setCardExpanded(false);
							} else {
								setCardExpanded(!cardExpanded);
							}
						}}
					>
						{cardExpanded ? (
							<MaterialIcons
								name="check-circle"
								size={30}
								color="#2397d4"
							/>
						) : (
								<Feather name="circle" size={30} color="#2397d4" />
							)}
					</TouchableOpacity>
				</View>

				{cardExpanded ? (
					<View style={styles.experience}>
						<View>
							<Text style={styles.titleExperience}>
								Quanto tempo de experiencia nessa área?
							</Text>
							<Text style={styles.textExperience}>
								{`${experience} `}
								{experience === 0
									? "a 6 meses"
									: experience === 1
										? "ano"
										: experience > 1
											? "anos"
											: null}
							</Text>
							<Slider
								style={{ width: "100%", height: 40, marginBottom: 10 }}
								minimumValue={0}
								maximumValue={10}
								step={1}
								minimumTrackTintColor="#2397d4"
								maximumTrackTintColor="#b0bec5"
								thumbTintColor="#2397d4"
								value={experience}
								onValueChange={(value) => setExperience(value)}
							/>
							<Text style={styles.titleExperience}>
								Possui algum curso ou certificação?
							</Text>
							<View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
								<View style={{ flexDirection: "row", alignItems: "center" }}>
									<Text style={styles.textCetificate}>Sim</Text>
									<TouchableOpacity onPress={() => setCertificate(true)}>
										{certificate ? (
											<MaterialIcons
												name="check-circle"
												size={25}
												color="#2397d4"
											/>
										) : (
												<Feather name="circle" size={25} color="#2397d4" />
											)}
									</TouchableOpacity>
								</View>
								<View style={{ flexDirection: "row" }}>
									<Text style={styles.textCetificate}>Não</Text>
									<TouchableOpacity onPress={() => setCertificate(false)}>
										{!certificate ? (
											<MaterialIcons
												name="check-circle"
												size={25}
												color="#2397d4"
											/>
										) : (
												<Feather name="circle" size={25} color="#2397d4" />
											)}
									</TouchableOpacity>
								</View>
							</View>
						</View>
					</View>
				) : null}
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
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

export default SelectorCategory;
