import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import Icon from "react-native-vector-icons/Ionicons";

import HomePage from "../../pages/Home";
import ProfilePage from "../../pages/Profile";
import JobsPage from "../../pages/Jobs";
import NotificationPage from '../../pages/Notification'

const HomeStack = createStackNavigator();
const JobsStack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();

const MainTabScreen = () => {
	return (
		<Tab.Navigator initialRouteName="Home" activeColor="grey">
			<Tab.Screen
				name="Home"
				component={HomeStackScreen}
				options={{
					tabBarLabel: "Home",
					tabBarColor: "#fff",
					tabBarIcon: () => (
						<Icon name="md-home" color='grey' size={26} activeColor='red' />
					)
				}}
			/>
			<Tab.Screen
				name="Details"
				component={JobsStackScreen}
				options={{
					tabBarLabel: "Jobs",
					tabBarColor: "#fff",
					tabBarIcon: () => (
						<Icon name="md-calendar" color="grey" size={26} />
					)
				}}
			/>
			<Tab.Screen
				name="Profile"
				component={ProfilePage}
				options={{
					tabBarLabel: "Perfil",
					tabBarColor: "#fff",
					tabBarIcon: () => (
						<Icon name="md-person" color='grey' size={26} />
					),
				}}
			/>
			<Tab.Screen
				name="Notification"
				component={NotificationPage}
				options={{
					tabBarLabel: "Notificações",
					tabBarColor: "#fff",
					tabBarIcon: () => (
						<Icon name="md-notifications" color='grey' size={26} />
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
				backgroundColor: "#fff",
			},
			headerTintColor: "grey",
			headerTintStyle: "bold",
		}}
	>
		<HomeStack.Screen
			name="Home"
			component={HomePage}
			options={{
				headerLeft: () => (
					<Icon.Button
						name="md-menu"
						size={28}
						backgroundColor="#fff"
						color='grey'
						onPress={() => {
							navigation.openDrawer();
						}}
					/>
				),
			}}
		/>
	</HomeStack.Navigator>
);

const JobsStackScreen = ({ navigation }) => (
	<JobsStack.Navigator
		screenOptions={{
			headerStyle: {
				backgroundColor: "#fff",
			},
			headerTintColor: "grey",
			headerTintStyle: "bold",
		}}
	>
		<JobsStack.Screen
			name="Jobs"
			component={JobsPage}
			options={{
				headerLeft: () => (
					<Icon.Button
						name="md-menu"
						size={25}
						color='grey'
						backgroundColor="#fff"
						onPress={() => {
							navigation.openDrawer();
						}}
					/>
				),
			}}
		/>
	</JobsStack.Navigator>
);

export default MainTabScreen;
