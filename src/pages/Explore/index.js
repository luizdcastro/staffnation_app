import * as React from "react";
import { View, Text, StyleSheet } from "react-native";

const ExplorePage = ({ navigation }) => {
	return (
		<View style={styles.screen}>
			<Text>Explore Screen</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	screen: { flex: 1, alignItems: "center", justifyContent: "center" },
});

export default ExplorePage;
