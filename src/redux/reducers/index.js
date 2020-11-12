import { combineReducers } from "redux";

import auth from './auth/authReducer'
import user from "./user/userReducer";

const rootReducer = combineReducers({
	auth,
	user,
});

export default rootReducer;
