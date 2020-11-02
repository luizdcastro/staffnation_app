import * as React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";

const HomeStack = createStackNavigator();


const HomePage = ({ navigation }) => {
	return (
		<View style={styles.screen}>
			<Text>Home Screen</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	screen: { flex: 1, alignItems: "center", justifyContent: "center", },
});


export default HomePage;
