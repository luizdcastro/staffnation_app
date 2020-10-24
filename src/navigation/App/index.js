import React from "react";
import { connect } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";

import DrawerContent from "../../components/DrawerContent";
import MaintabPage from "../MainTab";
import SupportPage from "../../pages/Support";
import FavoritePage from "../../pages/Favorites";
import SettingPage from "../../pages/Setting";
import AuthStack from "../AuthStack";
import {
	useFonts,
	Montserrat_400Regular,
	Montserrat_500Medium,
} from "@expo-google-fonts/montserrat";
import { AppLoading } from "expo";

const Drawer = createDrawerNavigator();

const App = ({ user }) => {
	let [fontsLoaded] = useFonts({
		Montserrat_400Regular,
		Montserrat_500Medium,
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
						<Drawer.Screen name="HomeDrawer" component={MaintabPage} />
						<Drawer.Screen name="SupportPage" component={SupportPage} />
						<Drawer.Screen name="FavoritePage" component={FavoritePage} />
						<Drawer.Screen name="SettingPage" component={SettingPage} />
					</Drawer.Navigator>
				)}
			</NavigationContainer>
		);
	}
};

const mapStateToProps = (state) => ({ user: state.user });

export default connect(mapStateToProps)(App);
