import React from "react";
import { connect } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";

import DrawerContent from "../../components/DrawerContent";
import MaintabPage from "../MainTab";
import HomePage from '../../pages/Home'
import SupportPage from "../../pages/Support";
import ProfilePage from "../../pages/Profile";
import JobsPage from "../../pages/Jobs";
import NotificationPage from '../../pages/Notification'

import AuthStack from "../AuthStack";
import {
	useFonts,
	Montserrat_400Regular,
	Montserrat_500Medium,
	Montserrat_700Bold,
	Montserrat_900Black,
} from "@expo-google-fonts/montserrat";
import { AppLoading } from "expo";

const Drawer = createDrawerNavigator();

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
				{!user.isLoggedIn ? (
					<AuthStack />
				) : (
						<Drawer.Navigator drawerContent={(props) => <DrawerContent {...props} />}>
							<Drawer.Screen name="MaintabPage" component={MaintabPage} />
							<Drawer.Screen name="SupportPage" component={SupportPage} />
							<Drawer.Screen name="JobsPage" component={JobsPage} />
							<Drawer.Screen name="ProfilePage" component={ProfilePage} />
							<Drawer.Screen name="NotificationPage" component={NotificationPage} />
						</Drawer.Navigator>
					)}
			</NavigationContainer>
		);
	}
};

const mapStateToProps = (state) => ({ user: state.user });

export default connect(mapStateToProps)(App);
