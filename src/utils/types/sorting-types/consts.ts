import { BUBBLE_SORT, MERGE_SORT, QUICK_SORT, SortingAlgorithmsType } from './sorting-alorithm-types';

export const sortingAlgDropdownOptions = [
    {
        key: 'Bubble Sort',
        value: 'Bubble Sort',
        text: 'Bubble Sort',
    },
    {
        key: 'Quick Sort',
        value: 'Quick Sort',
        text: 'Quick Sort',
    },

    {
        key: 'Merge Sort',
        value: 'Merge Sort',
        text: 'Merge Sort',
    },
];

export const sortingALgorithms: SortingAlgorithmsType[] = [BUBBLE_SORT, QUICK_SORT, MERGE_SORT];
