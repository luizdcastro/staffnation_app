import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import Icon from "react-native-vector-icons/Ionicons";

import HomePage from "../../pages/Home";
import DetailsPage from "../../pages/Details";
import ProfilePage from "../../pages/Profile";
import ExplorePage from "../../pages/Explore";

const HomeStack = createStackNavigator();
const DetailsStack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();

const MainTabScreen = () => {
	return (
		<Tab.Navigator initialRouteName="Home" activeColor="#fff">
			<Tab.Screen
				name="Home"
				component={HomeStackScreen}
				options={{
					tabBarLabel: "Home",
					tabBarColor: "#00FFFF",
					tabBarIcon: ({ color }) => (
						<Icon name="ios-home" color={color} size={26} />
					),
				}}
			/>
			<Tab.Screen
				name="Details"
				component={DetailsStackScreen}
				options={{
					tabBarLabel: "Details",
					tabBarColor: "#009387",
					tabBarIcon: ({ color }) => (
						<Icon name="ios-notifications" color={color} size={26} />
					),
				}}
			/>
			<Tab.Screen
				name="Profile"
				component={ProfilePage}
				options={{
					tabBarLabel: "Profile",
					tabBarColor: "#009387",
					tabBarIcon: ({ color }) => (
						<Icon name="ios-person" color={color} size={26} />
					),
				}}
			/>
			<Tab.Screen
				name="Explore"
				component={ExplorePage}
				options={{
					tabBarLabel: "Explore",
					tabBarColor: "#009387",
					tabBarIcon: ({ color }) => (
						<Icon name="ios-aperture" color={color} size={26} />
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
				backgroundColor: "#009387",
			},
			headerTintColor: "#fff",
			headerTintStyle: "bold",
		}}
	>
		<HomeStack.Screen
			name="Home"
			component={HomePage}
			options={{
				headerLeft: () => (
					<Icon.Button
						name="ios-menu"
						size={25}
						backgroundColor="#009387"
						onPress={() => {
							navigation.openDrawer();
						}}
					/>
				),
			}}
		/>
	</HomeStack.Navigator>
);

const DetailsStackScreen = ({ navigation }) => (
	<DetailsStack.Navigator
		screenOptions={{
			headerStyle: {
				backgroundColor: "#009387",
			},
			headerTintColor: "#fff",
			headerTintStyle: "bold",
		}}
	>
		<DetailsStack.Screen
			name="Details"
			component={DetailsPage}
			options={{
				headerLeft: () => (
					<Icon.Button
						name="ios-menu"
						size={25}
						backgroundColor="#009387"
						onPress={() => {
							navigation.openDrawer();
						}}
					/>
				),
			}}
		/>
	</DetailsStack.Navigator>
);

export default MainTabScreen;
