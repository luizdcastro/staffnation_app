import { combineReducers } from "redux";

import auth from './auth/authReducer'
import getme from './getMe/getMeReducer'
import user from "./user/userReducer";
import jobs from './job/jobReducer'
import file from './file/fileReducer'

const rootReducer = combineReducers({
	auth,
	getme,
	user,
	jobs,
	file,
});

export default rootReducer;
