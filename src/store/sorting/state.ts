import { SortingList } from '../../algorithms/sorting-algorithms/sorting';

export const ASCENDING = 'ASCENDING';
export const DESCENDING = 'DESCENDING';

export interface SortingState {
    sortingList: SortingList;
    initSortingList: SortingList;
    listSize: number;
    lowest: number;
    highest: number;
}
