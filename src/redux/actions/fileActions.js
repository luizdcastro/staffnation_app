import * as constants from '../constants';

export const uploadImage = (data, onSuccess, onError) => ({
    type: constants.API,
    payload: {
        method: 'POST',
        url: '/file',
        data,
        success: (response) => uploadedImage(response),
        postProccessSuccess: onSuccess,
        postProccessError: onError,
    },
});

export const deleteImage = (imageId) => ({
    type: constants.API,
    payload: {
        method: 'DELETE',
        url: `/file/${imageId}`,
        success: (response) => deletedImage(response),
    },
});

const uploadedImage = (data) => ({
    type: constants.UPLOAD_IMAGE,
    payload: data,
});

const deletedImage = (data) => ({
    type: constants.DELETE_IMAGE,
    payload: data,
});