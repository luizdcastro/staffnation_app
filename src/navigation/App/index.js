import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import * as Linking from 'expo-linking';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';

import { updateUser } from "../../redux/actions/userActions"
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

const prefix = Linking.makeUrl('/');

const App = ({ auth, user, dispatchUpdateUser }) => {

	useEffect(() => {
		if (auth.isLoggedIn) {
			registerForPushNotification()
		}
	}, [])

	registerForPushNotification = async () => {
		const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
		let finalStatus = existingStatus;
		if (existingStatus == 'granted') {
			const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
			finalStatus = status;
		}
		if (finalStatus !== 'granted') {
			alert('Failed to get push token for push notification!');
			return;
		}
		if (Platform.OS === 'android') {
			Notifications.setNotificationChannelAsync('default', {
				name: 'default',
				importance: Notifications.AndroidImportance.MAX,
				vibrationPattern: [0, 250, 250, 250],
				lightColor: '#FF231F7C',
			});
		}
		token = (await Notifications.getExpoPushTokenAsync()).data;
		dispatchUpdateUser(
			auth.userId,
			token
		)
		return token
	};

	const linking = {
		prefixes: [prefix],
	};

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
			<NavigationContainer linking={linking}>
				{!auth.isLoggedIn ?
					< AuthStack />
					:
					<MainStack />
				}
			</NavigationContainer>
		);
	}
};

const mapDispatchToProps = (dispatch) => ({
	dispatchUpdateUser: (id, pushId) =>
		dispatch(updateUser(id, { pushId }))
});

const mapStateToProps = (state) => ({
	auth: state.auth,
	user: state.user
});

export default connect(mapStateToProps, mapDispatchToProps)(App);