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

const allJobsData = (data) => ({
    type: constants.GET_ALL_JOBS,
    payload: data,
});

const singleJobData = (data) => ({
    type: constants.GET_SINGLE_JOB,
    payload: data,
});