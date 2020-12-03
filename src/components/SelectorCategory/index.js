import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from "react-native";

import { Feather } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import Slider from "@react-native-community/slider";

const { width, height } = Dimensions.get('window')


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
				<TouchableOpacity
					onPress={() => {
						if (categoriesLimit >= 2) {
							setCardExpanded(false);
						} else {
							setCardExpanded(!cardExpanded);
						}
					}}
				>
					<View style={styles.cardCategory}>
						<Text style={styles.titleCategory}>{title}</Text>
						{cardExpanded ? (
							<MaterialIcons
								name="check-circle"
								size={30}
								color="#523BE4"
							/>
						) : (
								<Feather name="circle" size={30} color="grey" />
							)}
					</View>
				</TouchableOpacity>

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
								minimumTrackTintColor="#6978EA"
								maximumTrackTintColor="#E8E8E8"
								thumbTintColor="#523BE4"

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
												color="#523BE4"
											/>
										) : (
												<Feather name="circle" size={25} color="grey" />
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
												color="#523BE4"
											/>
										) : (
												<Feather name="circle" size={25} color="grey" />
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
		marginHorizontal: '5%'
	},
	cardCategory: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		width: width - 30,
		height: 60,
		borderTopLeftRadius: 5,
		borderTopRightRadius: 5,
		paddingHorizontal: 20,
		backgroundColor: "#fff",
		elevation: 1,
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 0.5,
		},
		shadowOpacity: 0.09,
		shadowRadius: 0.5,
		elevation: 0.5,
		marginTop: 8
	},
	experience: {
		width: width - 30,
		height: 175,
		paddingHorizontal: 15,
		borderBottomLeftRadius: 5,
		borderBottomRightRadius: 5,
		backgroundColor: "#fff",
		elevation: 1,
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 0.5,
		},
		shadowOpacity: 0.09,
		shadowRadius: 0.5,
		elevation: 0.5,
	},
	titleCategory: {
		fontSize: 18,
		fontFamily: "NunitoSans_600SemiBold",
	},
	titleExperience: {
		fontSize: 16,
		fontFamily: "NunitoSans_400Regular",
		marginBottom: 10,

	},
	textExperience: {
		fontSize: 17,
		fontFamily: "NunitoSans_600SemiBold",
		textAlign: "center",

	},
	textCetificate: {
		fontSize: 17,
		fontFamily: "NunitoSans_600SemiBold",
		textAlign: "center",
		paddingHorizontal: 10,

	},
});

export default SelectorCategory;
