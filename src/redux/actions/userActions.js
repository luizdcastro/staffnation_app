import * as constants from "../constants";

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

const updatedUser = (data) => ({
    type: constants.UPDATED_USER,
    payload: data,
}); 