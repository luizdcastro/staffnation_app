import * as constants from "../../constants";

export default function jobReducer(state = [], action) {
    switch (action.type) {
        case constants.GET_ALL_JOBS:
            return action.payload;
        case constants.GET_SINGLE_JOB:
            return action.payload;
        case constants.CREATE_PENDING_APPLICATION:
            return action.payload;
        case constants.REMOVE_PENDING_APPLICATION:
            return action.payload;
        case constants.CANCEL_ACCEPTED_APPLICATION:
            return action.payload;
        default:
            return state;
    }
}