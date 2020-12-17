export const INIT_SORT = 'INIT_SORT';
export const CHANGE_SORTING_TYPE = 'CHANGE_SORTING_TYPE';
export const CHANGE_LOWEST = 'CHANGE_LOWEST';
export const CHANGE_HIGHEST = 'CHANGE_HIGHEST';
export const CLEAR_SORT = 'CLEAR_SORT';

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

export type SortingActions = InitSortAction | ChangeLowestAction | ChangeHighestAction | ClearSortAction;
