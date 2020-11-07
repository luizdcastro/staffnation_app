import React from "react";
import { connect } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from '@react-navigation/drawer';

import AuthStack from "../AuthStack";
import HomeStack from '../HomeStack'
import DrawerContent from '../../components/DrawerContent'

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

const Drawer = createDrawerNavigator();

const App = ({ user }) => {
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
				{!user.isLoggedIn ?
					<AuthStack />
					:
					<Drawer.Navigator drawerContent={props => <DrawerContent {...props} />}>
						<Drawer.Screen name="Home" component={HomeStack} />
					</Drawer.Navigator>}
			</NavigationContainer>
		);
	}
};

const mapStateToProps = (state) => ({ user: state.user });

export default connect(mapStateToProps)(App);
