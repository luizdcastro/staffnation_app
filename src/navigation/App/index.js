import React from "react";
import { connect } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";

import AuthStack from "../AuthStack";
import HomeStack from '../HomeStack'

import {
	useFonts,
	Montserrat_400Regular,
	Montserrat_500Medium,
	Montserrat_700Bold,
	Montserrat_900Black,
} from "@expo-google-fonts/montserrat";
import { AppLoading } from "expo";


const App = ({ user }) => {
	let [fontsLoaded] = useFonts({
		Montserrat_400Regular,
		Montserrat_500Medium,
		Montserrat_700Bold,
		Montserrat_900Black,
	});

	if (!fontsLoaded) {
		return <AppLoading />;
	} else {
		return (
			<NavigationContainer>
				{!user.isLoggedIn ? <AuthStack /> : <HomeStack />}
			</NavigationContainer>
		);
	}
};

const mapStateToProps = (state) => ({ user: state.user });

export default connect(mapStateToProps)(App);
