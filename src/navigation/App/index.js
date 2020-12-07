import React from "react";
import { connect } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";

import AuthStack from "../AuthStack";
import MainStack from '../MainStack'

import {
	useFonts,
	NunitoSans_200ExtraLight,
	NunitoSans_300Light,
	NunitoSans_400Regular,
	NunitoSans_600SemiBold,
	NunitoSans_700Bold,
	NunitoSans_800ExtraBold,
	NunitoSans_900Black,
} from '@expo-google-fonts/nunito-sans'

import { AppLoading } from "expo";

const App = ({ auth, getme }) => {

	let [fontsLoaded] = useFonts({
		NunitoSans_200ExtraLight,
		NunitoSans_300Light,
		NunitoSans_400Regular,
		NunitoSans_600SemiBold,
		NunitoSans_700Bold,
		NunitoSans_800ExtraBold,
		NunitoSans_900Black,
	});

	if (!fontsLoaded) {
		return <AppLoading />;
	} else {
		return (
			<NavigationContainer>
				{!auth.isLoggedIn ?
					< AuthStack />
					:
					<MainStack />
				}
			</NavigationContainer>
		);
	}
};

const mapStateToProps = (state) => ({ auth: state.auth, getme: state.getme });

export default connect(mapStateToProps)(App);