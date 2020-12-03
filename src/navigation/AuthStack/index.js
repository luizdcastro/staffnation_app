import React from "react";

import { createStackNavigator } from "@react-navigation/stack";

import AuthPage from "../../pages/AuthPage";

const AuthStack = createStackNavigator();

const AuthStackPage = ({ navigation }) => (
	<AuthStack.Navigator headerMode='none'>
		<AuthStack.Screen name="AuthPage" component={AuthPage} />
	</AuthStack.Navigator>
);

export default AuthStackPage;
