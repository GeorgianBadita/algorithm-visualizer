import { generateRandomNumber } from '../../utils/app-utils-functions';
import { copyNumbersImmutable } from '../../utils/sorting-utils-functions';
import { ArrayStackType } from '../../utils/types/sorting-types/array-stack-type';
import { SortingStackType, UNVISITED_STACK } from '../../utils/types/sorting-types/sorting-stack-type';
import { SortingState } from './state';
import { CHANGE_HIGHEST, CHANGE_LOWEST, CHANGE_SORTING_LIST, CLEAR_SORT, INIT_SORT, SortingActions } from './types';

const initialSortingState: SortingState = {
    sortingList: { numberList: [] },
    lowest: 0,
    highset: 0,
};

const initSort = (state: SortingState, lowest: number, highest: number): SortingState => {
    if (highest < lowest) {
        return state;
    }
    const newState = {
        ...state,
        lowest: lowest,
        highest: highest,
        sortingList: {
            numberList: Array.from({ length: highest }, () => ({
                elemType: UNVISITED_STACK as SortingStackType,
                number: generateRandomNumber(lowest, highest + 1),
            })),
        },
    };
    return newState;
};

const changeLowest = (state: SortingState, newLowest: number): SortingState => ({
    ...state,
    lowest: newLowest,
});

const changeHighest = (state: SortingState, newHighest: number): SortingState => ({
    ...state,
    highset: newHighest,
});

const clearSort = (state: SortingState): SortingState => ({
    ...initSort(state, state.lowest, state.highset),
});

const changeSortingList = (state: SortingState, newSortingList: ArrayStackType[]): SortingState => ({
    ...state,
    sortingList: { numberList: copyNumbersImmutable(newSortingList) },
});

export const sortingRedcer = (state = initialSortingState, action: SortingActions): SortingState => {
    switch (action.type) {
        case INIT_SORT:
            return initSort(state, action.lowest, action.highest);
        case CHANGE_LOWEST:
            return changeLowest(state, action.newLowest);
        case CHANGE_HIGHEST:
            return changeHighest(state, action.newHighest);
        case CLEAR_SORT:
            return clearSort(state);
        case CHANGE_SORTING_LIST:
            return changeSortingList(state, action.newSortingList);
        default:
            return state;
    }
};
