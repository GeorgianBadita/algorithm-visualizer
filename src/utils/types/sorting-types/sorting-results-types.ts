export const SWAP_PAIR = 'SWAP_PAIR';
export const PLACED_NUMBER = 'PLACED_NUMBER';
export const CURRENT_INDEX = 'CURRENT_INDEX';
export const SWAPPED_PAIR = 'SWAPPED_PAIR';
export const FINISHED_VISITING_INDEX = 'FINISH_VISITING_INDEX';
export const MERGE_PAIR = 'MERGE_PAIR';
export const FINISHED_MERGE_PAIR = 'FINISHED_MERGE_PAIR';
export const LEFT_TO_MERGE = 'LEFT_TO_MERGE';
export const FINISHED_LEFT_TO_MERGE = 'FINISHED_LEFT_TO_MERGE';

export type SwapPair = {
    type: typeof SWAP_PAIR;
    firstIndex: number;
    secondIndex: number;
};

export type PlacedNumber = {
    type: typeof PLACED_NUMBER;
    index: number;
};

export type CurrentIndex = {
    type: typeof CURRENT_INDEX;
    index: number;
};

export type SwappedPair = {
    type: typeof SWAPPED_PAIR;
    firstIndex: number;
    secondIndex: number;
};

export type FinishedVisitingIndex = {
    type: typeof FINISHED_VISITING_INDEX;
    index: number;
};

export type MergePair = {
    type: typeof MERGE_PAIR;
    firstIndex: number;
    secondIndex: number;
};

export type FinishedMergePair = {
    type: typeof FINISHED_MERGE_PAIR;
    firstIndex: number;
    secondIndex: number;
    currentIndex: number;
    placedNumber: number;
};

export type LeftToMerge = {
    type: typeof LEFT_TO_MERGE;
    indexLeftToMerge: number;
};

export type FinishedLeftToMerge = {
    type: typeof FINISHED_LEFT_TO_MERGE;
    indexLeftToMerge: number;
    currentIndex: number;
    placedNumber: number;
};

export type SortingOutputElementType =
    | SwapPair
    | PlacedNumber
    | CurrentIndex
    | SwappedPair
    | FinishedVisitingIndex
    | MergePair
    | FinishedMergePair
    | LeftToMerge
    | FinishedLeftToMerge;

export type SortingAlgorithmResult = {
    output: SortingOutputElementType[];
};
