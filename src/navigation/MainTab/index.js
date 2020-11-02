import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import Icon from "react-native-vector-icons/Ionicons";

import HomePage from "../../pages/Home";
import ProfilePage from "../../pages/Profile";
import JobsPage from "../../pages/Jobs";
import NotificationPage from '../../pages/Notification'

const HomeStack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();

const MainTabScreen = () => {
	return (
		<Tab.Navigator initialRouteName="Home" activeColor="#eceff1">
			<Tab.Screen
				name="Home"
				component={HomeStackScreen}
				options={{
					tabBarLabel: "Home",
					tabBarColor: "#263238",
					tabBarIcon: () => (
						<Icon name="md-apps" color='#eceff1' size={26} />
					),
				}}
			/>
			<Tab.Screen
				name="Details"
				component={JobsPage}
				options={{
					tabBarLabel: "Jobs",
					tabBarColor: "#263238",
					tabBarIcon: () => (
						<Icon name="md-calendar" color="#eceff1" size={26} />
					)
				}}
			/>
			<Tab.Screen
				name="Profile"
				component={ProfilePage}
				options={{
					tabBarLabel: "Perfil",
					tabBarColor: "#263238",
					tabBarIcon: () => (
						<Icon name="md-person" color='#eceff1' size={26} />
					),
				}}
			/>
			<Tab.Screen
				name="Notification"
				component={NotificationPage}
				options={{
					tabBarLabel: "Notificações",
					tabBarColor: "#263238",
					tabBarIcon: () => (
						<Icon name="md-notifications" color='#eceff1' size={26} />
					),
				}}
			/>
		</Tab.Navigator>
	);
};

const HomeStackScreen = ({ navigation }) => (
	<HomeStack.Navigator
		screenOptions={{
			headerStyle: {
				backgroundColor: "#263238",
				height: 80

			},
			headerTintColor: "#eceff1",
			headerTitleStyle: {
				fontFamily: "Montserrat_500Medium",
				fontSize: 18
			}


		}}
	>
		<HomeStack.Screen
			name="Olá, Luiz!"
			component={HomePage}
			options={{
				headerLeft: () => (
					<Icon.Button
						name="md-menu"
						size={30}
						backgroundColor="#263238"
						color='#eceff1'
						onPress={() => {
							navigation.openDrawer();
						}}
					/>
				),
			}}
		/>
	</HomeStack.Navigator>
);

export default MainTabScreen;
