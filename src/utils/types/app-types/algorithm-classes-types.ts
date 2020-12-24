import { GraphAlgoirhtmsType } from '../graph-types/graph-algorithm-types';
import { SortingAlgorithmsType } from '../sorting-types/sorting-alorithm-types';

export type AlgDropdownOption = {
    key: string;
    value: string;
    text: string;
};

export type AlgorithmType = GraphAlgoirhtmsType | SortingAlgorithmsType;
