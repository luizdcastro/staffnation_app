import * as constants from "../../constants";

export default function userReducer(state = [], action) {
    switch (action.type) {
        case constants.GET_USER_DATA:
            return action.payload;
        default:
            return state;
    }
}
