import * as constants from "../../constants";
import { AsyncStorage } from "react-native";

const defaultState = {
	userId: null,
	token: null,
	isLoggedIn: null,
};

const userInfo = AsyncStorage.getItem("auth");
const INITIAL_STATE = userInfo || defaultState;

export default function userReducer(state = INITIAL_STATE, action) {
	switch (action.type) {
		case constants.SET_USER_INFO:
			return { ...action.payload };
		case constants.RESET_USER_INFO:
			return { ...defaultState };
		default:
			return state;
	}
}
