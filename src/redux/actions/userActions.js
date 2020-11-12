import * as constants from "../constants";

export const getUser = (id) => ({
    type: constants.API,
    payload: {
        method: "GET",
        url: `/user/${id}`,
        success: (response) => userData(response),
    },
});

const userData = (data) => ({
    type: constants.GET_USER_DATA,
    payload: data,
}); 