import {
    BUBBLE_SORT,
    MERGE_SORT,
    QUICK_SORT,
    SortingAlgorithmsType,
} from './types/sorting-types/sorting-alorithm-types';

export const sortNameToSortType = (name: string): SortingAlgorithmsType => {
    switch (name) {
        case 'Bubble Sort':
            return BUBBLE_SORT;
        case 'Quick Sort':
            return QUICK_SORT;
        case 'Merge Sort':
            return MERGE_SORT;
        default:
            return BUBBLE_SORT; //TODO: come up with an abstraction for NO_ALGORITHM
    }
};
