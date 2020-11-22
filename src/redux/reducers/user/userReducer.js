import * as constants from "../../constants";

export default function userReducer(state = [], action) {
    switch (action.type) {
        case constants.UPDATED_USER:
            return action.payload;
        default:
            return state;
    }
}
