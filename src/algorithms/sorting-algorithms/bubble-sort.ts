import { SortingState } from '../../store/sorting/state';
import {
    SortingAlgorithmOutput,
    SortingOutputElementType,
} from '../../utils/types/sorting-types/sorting-results-types';

export const bubbleSort = (sortingState: SortingState): SortingAlgorithmOutput => {
    const outputList: SortingOutputElementType[] = [];

    const numbers = [...sortingState.sortingList.numberList];
    let sorted = false;
    let current = 0;
    let i = 0;
    do {
        sorted = true;
        for (i = 0; i < numbers.length - 1 - current; ++i) {
            outputList.push({ index: i });
            if (outputList[i] > outputList[i + 1]) {
                outputList.push({ firstIndex: i, secondIndex: i + 1 });
                const tmp = outputList[i];
                outputList[i] = outputList[i + 1];
                outputList[i + 1] = tmp;
                sorted = false;
            }
        }
        outputList.push({ placed: true, index: i });
        current += 1;
    } while (!sorted);
    for (let index = 0; index <= i; ++index) {
        outputList.push({ placed: true, index: index });
    }
    return {
        output: outputList,
    };
};
