export const SWAP_PAIR = 'SWAP_PAIR';
export const PLACED_NUMBER = 'PLACED_NUMBER';
export const CURRENT_INDEX = 'CURRENT_INDEX';
export const SWAPPED_PAIR = 'SWAPPED_PAIR';
export const FINISHED_VISITING_INDEX = 'FINISH_VISITING_INDEX';

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

export type SortingOutputElementType = SwapPair | PlacedNumber | CurrentIndex | SwappedPair | FinishedVisitingIndex;

export type SortingAlgorithmResult = {
    output: SortingOutputElementType[];
};
