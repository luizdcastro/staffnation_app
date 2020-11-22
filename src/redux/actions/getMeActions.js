import * as constants from '../constants';

export const getMe = (onSuccess, onError) => ({
    type: constants.API,
    payload: {
        method: 'GET',
        url: '/user/me',
        success: (response) => fetchMe(response),
        postProccessSuccess: onSuccess,
        postProccessError: onError,
    },
});

const fetchMe = (data) => ({
    type: constants.GET_ME,
    payload: data,
});