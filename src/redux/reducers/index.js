import { combineReducers } from "redux";

import auth from './auth/authReducer'
import user from "./user/userReducer";
import job from './job/jobReducer'

const rootReducer = combineReducers({
	auth,
	user,
	job
});

export default rootReducer;
