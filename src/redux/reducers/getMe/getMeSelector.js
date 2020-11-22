import { createSelector } from 'reselect';

const selectGetMe = (state) => state.getme;

export const selectGetMeData = createSelector([selectGetMe], (getme) => getme);