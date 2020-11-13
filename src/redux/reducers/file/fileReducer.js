import * as constants from '../../constants';

export default function uploadReducer(state = {}, action) {
    switch (action.type) {
        case constants.UPLOAD_IMAGE:
            return { ...action.payload };
        case constants.DELETE_IMAGE:
            return { ...action.payload };
        default:
            return state;
    }
}