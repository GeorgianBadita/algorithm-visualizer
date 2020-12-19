import { ArrayStackType } from '../../utils/types/sorting-types/array-stack-type';

export const INIT_SORT = 'INIT_SORT';
export const CHANGE_LOWEST = 'CHANGE_LOWEST';
export const CHANGE_HIGHEST = 'CHANGE_HIGHEST';
export const CLEAR_SORT = 'CLEAR_SORT';
export const CHANGE_SORTING_LIST = 'CHANGE_SORTING_LIST';
export const CHANGE_LIST_SIZE = 'CHANGE_LIST_SIZE';

interface InitSortAction {
    type: typeof INIT_SORT;
    size: number;
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

interface ChangeListSizeAction {
    type: typeof CHANGE_LIST_SIZE;
    newSize: number;
}

export type SortingActions =
    | InitSortAction
    | ChangeLowestAction
    | ChangeHighestAction
    | ClearSortAction
    | ChangeSortingListAction
    | ChangeListSizeAction;
