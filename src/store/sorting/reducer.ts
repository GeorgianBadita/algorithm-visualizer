import { generateRandomNumber } from '../../utils/app-utils-functions';
import { copyNumbersImmutable } from '../../utils/sorting-utils-functions';
import { ArrayStackType } from '../../utils/types/sorting-types/array-stack-type';
import { SortingStackType, UNVISITED_STACK } from '../../utils/types/sorting-types/sorting-stack-type';
import { SortingState } from './state';
import {
    CHANGE_HIGHEST,
    CHANGE_LIST_SIZE,
    CHANGE_LOWEST,
    CHANGE_SORTING_LIST,
    CLEAR_SORT,
    INIT_SORT,
    RESET_LIST,
    SortingActions,
} from './types';

const initialSortingState: SortingState = {
    sortingList: { numberList: [] },
    initSortingList: { numberList: [] },
    listSize: 0,
    lowest: 0,
    highest: 0,
};

const initSort = (state: SortingState, lowest: number, highest: number, size: number): SortingState => {
    if (highest < lowest) {
        return state;
    }
    const numList = Array.from({ length: size }, () => ({
        elemType: UNVISITED_STACK as SortingStackType,
        number: generateRandomNumber(lowest, highest + 1),
    }));
    const newState = {
        ...state,
        lowest: lowest,
        highest: highest,
        sortingList: {
            numberList: numList,
        },
        initSortingList: {
            numberList: copyNumbersImmutable(numList),
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
    highest: newHighest,
});

const clearSort = (state: SortingState): SortingState => ({
    ...initSort(state, state.lowest, state.highest, state.listSize),
});

const changeSortingList = (state: SortingState, newSortingList: ArrayStackType[]): SortingState => ({
    ...state,
    sortingList: { numberList: copyNumbersImmutable(newSortingList) },
});

const changeListSize = (state: SortingState, newSize: number): SortingState => ({
    ...state,
    listSize: newSize,
});

const resetList = (state: SortingState): SortingState => ({
    ...initSort(state, state.lowest, state.highest, state.listSize),
});

export const sortingRedcer = (state = initialSortingState, action: SortingActions): SortingState => {
    switch (action.type) {
        case INIT_SORT:
            return initSort(state, action.lowest, action.highest, action.size);
        case CHANGE_LOWEST:
            return changeLowest(state, action.newLowest);
        case CHANGE_HIGHEST:
            return changeHighest(state, action.newHighest);
        case CLEAR_SORT:
            return clearSort(state);
        case CHANGE_SORTING_LIST:
            return changeSortingList(state, action.newSortingList);
        case CHANGE_LIST_SIZE:
            return changeListSize(state, action.newSize);
        case RESET_LIST:
            return resetList(state);
        default:
            return state;
    }
};
