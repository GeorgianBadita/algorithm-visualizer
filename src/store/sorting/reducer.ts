import { ASCENDING, SortingState, SortingType } from './state';
import { CHANGE_HIGHEST, CHANGE_LOWEST, CHANGE_SORTING_TYPE, CLEAR_SORT, INIT_SORT, SortingActions } from './types';

const initialSortingState: SortingState = {
    sortingList: { numberList: [] },
    lowest: 0,
    highset: 0,
    type: ASCENDING,
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
            numberList: Array.from({ length: highest }, (x, i) => i).filter((elem: number) => elem >= lowest),
        },
    };
    return newState;
};

const changeSortingType = (state: SortingState, newSortingType: SortingType): SortingState => ({
    ...state,
    type: newSortingType,
});

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
    type: state.type,
});

export const sortingRedcer = (state = initialSortingState, action: SortingActions): SortingState => {
    switch (action.type) {
        case INIT_SORT:
            return initSort(state, action.lowest, action.highest);
        case CHANGE_SORTING_TYPE:
            return changeSortingType(state, action.newSortingType);
        case CHANGE_LOWEST:
            return changeLowest(state, action.newLowest);
        case CHANGE_HIGHEST:
            return changeHighest(state, action.newHighest);
        case CLEAR_SORT:
            return clearSort(state);
        default:
            return state;
    }
};
