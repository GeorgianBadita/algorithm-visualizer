import { ArrayStackType } from '../../utils/types/sorting-types/array-stack-type';
import { CHANGE_HIGHEST, CHANGE_LOWEST, CHANGE_SORTING_LIST, CLEAR_SORT, INIT_SORT, SortingActions } from './types';

export const initSort = (lowest: number, highest: number): SortingActions => ({
    type: INIT_SORT,
    lowest: lowest,
    highest: highest,
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

export const changeSortingList = (newSortingList: ArrayStackType[]): SortingActions => ({
    type: CHANGE_SORTING_LIST,
    newSortingList: newSortingList,
});
