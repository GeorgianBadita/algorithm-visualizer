import { bubbleSort } from '../algorithms/sorting-algorithms/bubble-sort';
import { mergeSort } from '../algorithms/sorting-algorithms/merge-sort';
import { quickSort } from '../algorithms/sorting-algorithms/quick-sort';
import { SortingState } from '../store/sorting/state';
import { AlgorithmType } from './types/app-types/algorithm-classes-types';
import { ArrayStackType } from './types/sorting-types/array-stack-type';
import { sortingALgorithms } from './types/sorting-types/consts';
import {
    BUBBLE_SORT,
    MERGE_SORT,
    QUICK_SORT,
    SortingAlgorithmsType,
} from './types/sorting-types/sorting-alorithm-types';
import { SortingAlgorithmResult } from './types/sorting-types/sorting-results-types';

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

export const isSortingAlgorithm = (alg: AlgorithmType): boolean => {
    return sortingALgorithms.some((elem: AlgorithmType) => elem === alg);
};

export const getSorginAlgorithmOutput = (alg: AlgorithmType, sortingState: SortingState): SortingAlgorithmResult => {
    switch (alg) {
        case BUBBLE_SORT: {
            return { ...bubbleSort(sortingState) };
        }
        case MERGE_SORT: {
            return { ...mergeSort(sortingState) };
        }
        case QUICK_SORT: {
            return { ...quickSort(sortingState) };
        }
        default:
            return { output: [] };
    }
};

export const copyNumbersImmutable = (numbers: ArrayStackType[]): ArrayStackType[] => {
    return [...numbers.map((elem: ArrayStackType) => ({ ...elem }))];
};
