import { createSelector } from 'reselect';

const jobSelector = (state) => state.job;

export const selectJobData = createSelector([jobSelector], (job) => job);