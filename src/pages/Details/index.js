import * as React from "react";
import { View, Text, StyleSheet } from "react-native";

const DetailsPage = ({ navigation }) => {
	return (
		<View style={styles.screen}>
			<Text>Details Screen</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	screen: { flex: 1, alignItems: "center", justifyContent: "center" },
});

export default DetailsPage;
