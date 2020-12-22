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

export const createPaymentMethod = (data, onSuccess, onError) => ({
    type: constants.API,
    payload: {
        method: "POST",
        url: `/user/payment`,
        data,
        success: (response) => createdPaymentMethod(response),
        postProccessSuccess: onSuccess,
        postProccessError: onError,
    },
});

const updatedUser = (data) => ({
    type: constants.UPDATED_USER,
    payload: data,
});

const createdPaymentMethod = (data) => ({
    type: constants.CREATE_PAYMENT_METHOD,
    payload: data,
}); 