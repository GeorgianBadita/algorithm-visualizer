import { SortingState } from '../../store/sorting/state';
import { copyNumbersImmutable } from '../../utils/sorting-utils-functions';
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

export const bubbleSort = (sortingState: SortingState): SortingAlgorithmResult => {
    const outputList: SortingOutputElementType[] = [];

    const numbers = copyNumbersImmutable(sortingState.sortingList.numberList).map(
        (elem: ArrayStackType) => elem.number,
    );

    let sorted = false;
    let current = 0;
    let i = 0;
    do {
        sorted = true;
        for (i = 0; i < numbers.length - 1 - current; ++i) {
            outputList.push({ index: i, type: CURRENT_INDEX });
            if (numbers[i] > numbers[i + 1]) {
                outputList.push({ firstIndex: i, secondIndex: i + 1, type: SWAP_PAIR });
                const tmp = numbers[i];
                numbers[i] = numbers[i + 1];
                numbers[i + 1] = tmp;
                sorted = false;
                outputList.push({ firstIndex: i, secondIndex: i + 1, type: SWAPPED_PAIR });
            }
            outputList.push({ index: i, type: FINISHED_VISITING_INDEX });
        }
        outputList.push({ index: i, type: PLACED_NUMBER });
        current += 1;
    } while (!sorted);
    for (let index = 0; index <= numbers.length; ++index) {
        outputList.push({ index: index, type: PLACED_NUMBER });
    }
    return {
        output: outputList,
    };
};
