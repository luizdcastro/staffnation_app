import * as constants from "../constants";

export const getUser = (id) => ({
    type: constants.API,
    payload: {
        method: "GET",
        url: `/user/${id}`,
        success: (response) => userData(response),
    },
});

export const updateUser = (id, data, onSuccess, onError) => ({
    type: constants.API,
    payload: {
        method: "PATCH",
        url: `/user/update/${id}`,
        data,
        success: (response) => updatedUser(response),
        postProccessSuccess: onSuccess,
        postProccessError: onError,
    },
});

const userData = (data) => ({
    type: constants.GET_USER_DATA,
    payload: data,
});


const updatedUser = (data) => ({
    type: constants.UPDATED_USER,
    payload: data,
}); 