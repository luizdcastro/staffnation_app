import * as constants from "../constants";

export const getAllJobs = (onSuccess, onError) => ({
    type: constants.API,
    payload: {
        method: "GET",
        url: '/job',
        success: (response) => allJobsData(response),
        postProccessSuccess: onSuccess,
        postProccessError: onError,
    },
});

export const getSingleJob = (id, onSuccess, onError) => ({
    type: constants.API,
    payload: {
        method: "GET",
        url: `/job/${id}`,
        success: (response) => singleJobData(response),
        postProccessSuccess: onSuccess,
        postProccessError: onError,
    },
});

export const createPendingApplication = (id, data, onSuccess, onError) => ({
    type: constants.API,
    payload: {
        method: "PATCH",
        url: `/job/createPending/${id}`,
        data,
        success: (response) => addedPendingApplication(response),
        postProccessSuccess: onSuccess,
        postProccessError: onError,
    },
});

export const removePendingApplication = (id, data, onSuccess, onError) => ({
    type: constants.API,
    payload: {
        method: "PATCH",
        url: `/job/removePending/${id}`,
        data,
        success: (response) => removedPendingApplication(response),
        postProccessSuccess: onSuccess,
        postProccessError: onError,
    },
});

export const cancelAcceptedApplication = (id, data, onSuccess, onError) => ({
    type: constants.API,
    payload: {
        method: "PATCH",
        url: `/job/removeAccepted/${id}`,
        data,
        success: (response) => canceledAcceptedApplication(response),
        postProccessSuccess: onSuccess,
        postProccessError: onError,
    },
});

const allJobsData = (data) => ({
    type: constants.GET_ALL_JOBS,
    payload: data,
});

const singleJobData = (data) => ({
    type: constants.GET_SINGLE_JOB,
    payload: data,
});

const addedPendingApplication = (data) => ({
    type: constants.CREATE_PENDING_APPLICATION,
    payload: data,
});

const removedPendingApplication = (data) => ({
    type: constants.REMOVE_PENDING_APPLICATION,
    payload: data,
});

const canceledAcceptedApplication = (data) => ({
    type: constants.CANCEL_ACCEPTED_APPLICATION,
    payload: data,
});