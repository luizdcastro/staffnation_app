import React from "react";

import { createStackNavigator } from "@react-navigation/stack";

import AuthPage from "../../pages/AuthPage";
import RegisterPage from "../../pages/RegisterPage";
import LoginPage from "../../pages/LoginPage";

const AuthStack = createStackNavigator();

const AuthStackPage = ({ navigation }) => (
	<AuthStack.Navigator headerMode='none'>
		<AuthStack.Screen name="AuthPage" component={AuthPage} />
		<AuthStack.Screen name="LoginPage" component={LoginPage} />
		<AuthStack.Screen name="RegisterPage" component={RegisterPage} />
	</AuthStack.Navigator>
);

export default AuthStackPage;
