export type SwapPair = {
    firstIndex: number;
    secondIndex: number;
};

export type PlacedNumber = {
    placed: true;
    index: number;
};

export type CurrentIndex = {
    index: number;
};

export type SortingOutputElementType = SwapPair | PlacedNumber | CurrentIndex;

export type SortingAlgorithmOutput = {
    output: SortingOutputElementType[];
};
