import React from "react";
import { Text, StyleSheet, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const GradientButton = ({ title, onPress, gradient, textStyle }) => {
	return (
		<TouchableOpacity onPress={onPress} style={styles.button}>
			<LinearGradient colors={gradient} style={styles.gradient}>
				<Text style={[styles.text, textStyle]}>{title}</Text>
			</LinearGradient>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	button: {
		width: "95%",
		height: 50,
		justifyContent: "center",
		alignItems: "center",
		flexDirection: "row",
		borderRadius: 5,
	},
	gradient: {
		width: "100%",
		height: 50,
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 5,
	},
	text: {
		color: "#262833",
		textTransform: "uppercase",
		fontSize: 14,
		fontFamily: "Montserrat_500Medium",
	},
});

export default GradientButton;
