import { SortingList } from '../../algorithms/sorting-algorithms/sorting';

export const ASCENDING = 'ASCENDING';
export const DESCENDING = 'DESCENDING';

export type SortingType = typeof ASCENDING | typeof DESCENDING;

export interface SortingState {
    sortingList: SortingList;
    lowest: number;
    highset: number;
    type: SortingType;
}
