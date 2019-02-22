import { SELECT_FILTER } from './actionTypes';

export const selectFilter = filter => ({
    type: SELECT_FILTER,
    filter: filter
})