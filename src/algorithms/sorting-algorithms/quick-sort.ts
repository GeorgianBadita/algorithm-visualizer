import { SortingState } from '../../store/sorting/state';
import { ArrayStackType } from '../../utils/types/sorting-types/array-stack-type';
import {
    CURRENT_INDEX,
    FINISHED_VISITING_INDEX,
    PLACED_NUMBER,
    SortingAlgorithmResult,
    SortingOutputElementType,
    SWAPPED_PAIR,
    SWAP_PAIR,
} from '../../utils/types/sorting-types/sorting-results-types';

const pivoting = (arr: number[], low: number, high: number, output: SortingOutputElementType[]): number => {
    const piv = arr[high];
    output.push({ index: high, type: CURRENT_INDEX });
    let i = low - 1;

    for (let j = low; j <= high - 1; j++) {
        if (arr[j] < piv) {
            i++;
            output.push({ firstIndex: i, secondIndex: j, type: SWAP_PAIR });
            const tmp = arr[i];
            arr[i] = arr[j];
            arr[j] = tmp;
            output.push({ firstIndex: i, secondIndex: j, type: SWAPPED_PAIR });
        }
    }
    output.push({ firstIndex: i + 1, secondIndex: high, type: SWAP_PAIR });
    const tmp = arr[i + 1];
    arr[i + 1] = arr[high];
    arr[high] = tmp;
    output.push({ firstIndex: i + 1, secondIndex: high, type: SWAPPED_PAIR });

    output.push({ index: high, type: FINISHED_VISITING_INDEX });
    output.push({ index: i + 1, type: PLACED_NUMBER });

    return i + 1;
};

const quickSortAux = (numbers: number[], left: number, right: number, output: SortingOutputElementType[]): void => {
    if (left < right) {
        const pi = pivoting(numbers, left, right, output);

        quickSortAux(numbers, left, pi - 1, output);
        quickSortAux(numbers, pi + 1, right, output);
    }
    if (left === right) {
        output.push({ index: left, type: PLACED_NUMBER });
    }
};

export const quickSort = (sortingState: SortingState): SortingAlgorithmResult => {
    const output: SortingOutputElementType[] = [];

    const numbers = sortingState.sortingList.numberList.map((el: ArrayStackType) => el.number);
    quickSortAux(numbers, 0, numbers.length - 1, output);

    return {
        output: output,
    };
};
