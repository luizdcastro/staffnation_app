import { createSelector } from 'reselect';

const selectAuth = (state) => state.auth;

export const selectAuthData = createSelector([selectAuth], (auth) => auth);