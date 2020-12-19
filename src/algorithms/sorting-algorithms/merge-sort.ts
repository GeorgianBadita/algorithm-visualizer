import { SortingState } from '../../store/sorting/state';
import { copyNumbersImmutable } from '../../utils/sorting-utils-functions';
import { ArrayStackType } from '../../utils/types/sorting-types/array-stack-type';
import {
    CURRENT_INDEX,
    FINISHED_VISITING_INDEX,
    SortingAlgorithmResult,
    SortingOutputElementType,
} from '../../utils/types/sorting-types/sorting-results-types';

const merge = (numbers: number[], start: number, mid: number, end: number, resList: SortingOutputElementType[]) => {
    const firstHalf = [];
    const secondHalf = [];
    for (let i = start; i <= mid; ++i) {
        firstHalf.push(numbers[i]);
    }
    for (let i = mid + 1; i <= end; ++i) {
        secondHalf.push(numbers[i]);
    }

    let i = 0;
    let j = 0;
    let k = start;
    while (i < firstHalf.length && j < secondHalf.length) {
        if (firstHalf[i] > secondHalf[j]) {
            numbers[k] = firstHalf[i];
            i += 1;
        } else {
            numbers[k] = secondHalf[j];
            j += 1;
        }
        k += 1;
    }

    while (i < firstHalf.length) {
        numbers[k] = firstHalf[i];
        i++;
        k++;
    }

    while (j < secondHalf.length) {
        numbers[k] = secondHalf[j];
        j++;
        k++;
    }
};

const mergeSortAux = (numbers: number[], start: number, end: number, resList: SortingOutputElementType[]): void => {
    if (start >= end) {
        return;
    }
    const mid = ((start + end) / 2) | 0;
    resList.push({ index: mid, type: CURRENT_INDEX });
    mergeSortAux(numbers, start, mid, resList);
    mergeSortAux(numbers, mid + 1, end, resList);
    merge(numbers, start, mid, end, resList);
    resList.push({ index: mid, type: FINISHED_VISITING_INDEX });
};

export const mergeSort = (sortingState: SortingState): SortingAlgorithmResult => {
    const numbers = copyNumbersImmutable(sortingState.sortingList.numberList).map(
        (elem: ArrayStackType) => elem.number,
    );
    const resList: SortingOutputElementType[] = [];
    mergeSortAux(numbers, 0, numbers.length - 1, resList);
    const output = {
        output: resList,
    };
    return output;
};
