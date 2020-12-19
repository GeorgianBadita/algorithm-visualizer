import { ArrayStackType } from '../../utils/types/sorting-types/array-stack-type';

export const INIT_SORT = 'INIT_SORT';
export const CHANGE_LOWEST = 'CHANGE_LOWEST';
export const CHANGE_HIGHEST = 'CHANGE_HIGHEST';
export const CLEAR_SORT = 'CLEAR_SORT';
export const CHANGE_SORTING_LIST = 'CHANGE_SORTING_LIST';

interface InitSortAction {
    type: typeof INIT_SORT;
    lowest: number;
    highest: number;
}

interface ChangeLowestAction {
    type: typeof CHANGE_LOWEST;
    newLowest: number;
}

interface ChangeHighestAction {
    type: typeof CHANGE_HIGHEST;
    newHighest: number;
}

interface ClearSortAction {
    type: typeof CLEAR_SORT;
}

interface ChangeSortingListAction {
    type: typeof CHANGE_SORTING_LIST;
    newSortingList: ArrayStackType[];
}

export type SortingActions =
    | InitSortAction
    | ChangeLowestAction
    | ChangeHighestAction
    | ClearSortAction
    | ChangeSortingListAction;
