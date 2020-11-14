import * as constants from "../../constants";

export default function jobReducer(state = [], action) {
    switch (action.type) {
        case constants.GET_ALL_JOBS:
            return action.payload;
        default:
            return state;
    }
}