import React from "react";

import { createStackNavigator } from "@react-navigation/stack";

import AuthPage from "../../pages/Auth";
import RegisterPage from "../../pages/Register";
import LoginPage from "../../pages/Login";

const AuthStack = createStackNavigator();

const AuthStackPage = ({ navigation }) => (
	<AuthStack.Navigator headerMode="nome">
		<AuthStack.Screen name="AuthPage" component={AuthPage} />
		<AuthStack.Screen name="RegisterPage" component={RegisterPage} />
		<AuthStack.Screen name="LoginPage" component={LoginPage} />
	</AuthStack.Navigator>
);

export default AuthStackPage;
