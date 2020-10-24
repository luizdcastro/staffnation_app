import axios from "axios";

import * as constants from "../redux/constants";
import { logoutUser } from "../redux/actions/authActions";

export const apiMiddleware = ({ dispatch, getState }) => (next) => (action) => {
	if (action.type !== constants.API) return next(action);

	const BASE_URL = "https://staffnation-server.herokuapp.com/v1";
	const AUTH_TOKEN = getState().user.token;
	if (AUTH_TOKEN)
		axios.defaults.headers.common["Authorization"] = `Bearer ${AUTH_TOKEN}`;

	const {
		url,
		method,
		success,
		data,
		onUploadProgress,
		postProccessSuccess,
		postProccessError,
	} = action.payload;

	axios({
		method,
		url: BASE_URL + url,
		data: data ? data : null,
		onUploadProgress: onUploadProgress,
	})
		.then((response) => {
			if (success) dispatch(success(response.data));
			if (postProccessSuccess) postProccessSuccess(response.data);
		})
		.catch((error) => {
			if (!error.data) console.log(error);
			else {
				if (error.data) {
					if (error.data && error.data.status === 403) dispatch(logoutUser());
					if (postProccessError) postProccessError(error.data);
				}
			}
		});
};
