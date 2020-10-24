import * as React from "react";
import { View, Text, StyleSheet } from "react-native";

const ProfilePage = ({ navigation }) => {
	return (
		<View style={styles.screen}>
			<Text>Profile Screen</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	screen: { flex: 1, alignItems: "center", justifyContent: "center" },
});

export default ProfilePage;
