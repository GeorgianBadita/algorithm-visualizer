import { CHANGE_HIGHEST, CHANGE_LOWEST, CHANGE_SORTING_TYPE, CLEAR_SORT, INIT_SORT, SortingActions } from './types';
import { SortingType } from './state';

export const initSort = (lowest: number, highest: number): SortingActions => ({
    type: INIT_SORT,
    lowest: lowest,
    highest: highest,
});

export const changeSortingType = (newSortingType: SortingType): SortingActions => ({
    type: CHANGE_SORTING_TYPE,
    newSortingType: newSortingType,
});

export const changeLowest = (newLowest: number): SortingActions => ({
    type: CHANGE_LOWEST,
    newLowest: newLowest,
});

export const changeHighest = (newHighest: number): SortingActions => ({
    type: CHANGE_HIGHEST,
    newHighest: newHighest,
});

export const clearSort = (): SortingActions => ({
    type: CLEAR_SORT,
});
