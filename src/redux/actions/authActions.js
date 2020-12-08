import * as constants from "../constants";
import AsyncStorage from "@react-native-community/async-storage";

export const registerUser = (data, onSuccess, onError) => ({
	type: constants.API,
	payload: {
		method: "POST",
		url: "/auth/registrar",
		data,
		success: (response) => setAuthInfo(response),
		postProccessSuccess: onSuccess,
		postProccessError: onError,
	},
});

export const loginUser = (data, onSuccess, onError) => ({
	type: constants.API,
	payload: {
		method: "POST",
		url: "/auth/login",
		data,
		success: (response) => setAuthInfo(response),
		postProccessSuccess: onSuccess,
		postProccessError: onError,
	},
});

export const forgotPassword = (data, onSuccess, onError) => ({
	type: constants.API,
	payload: {
		method: "POST",
		url: "/auth/forgotPassword",
		data,
		postProccessSuccess: onSuccess,
		postProccessError: onError,
	},
});

export const logoutUser = () => {
	AsyncStorage.removeItem("auth");
	return { type: constants.RESET_USER_INFO };
};

const setAuthInfo = (data) => {
	const parsedToken = JSON.parse(atob(data.token.split(".")[1]));
	const authInfo = {
		userId: parsedToken.id,
		token: data.token,
		isLoggedIn: true,
	};
	AsyncStorage.setItem("auth", JSON.stringify(authInfo));
	return { type: constants.SET_USER_INFO, payload: authInfo };
};
