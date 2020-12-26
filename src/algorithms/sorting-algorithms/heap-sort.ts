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

class Heap {
    readonly heapArr: number[];
    readonly heapSize: number;
    readonly resList: SortingOutputElementType[];
    private currentSize: number;

    constructor(numbers: number[]) {
        this.heapSize = numbers.length;
        this.currentSize = numbers.length;
        this.heapArr = [...numbers];
        this.resList = [];
        this.heapify();
    }

    private heapify = (): void => {
        const currIdx = ((this.currentSize / 2) | 0) - 1;
        for (let i = currIdx; i >= 0; i--) {
            this.resList.push({ type: CURRENT_INDEX, index: i });
            this.heapifyDown(i);
            this.resList.push({ type: FINISHED_VISITING_INDEX, index: i });
        }
    };

    public heapSort = (): void => {
        for (let i = 0; i < this.heapSize; i++) {
            this.resList.push({ type: SWAP_PAIR, firstIndex: 0, secondIndex: this.currentSize - 1 });
            const tmp = this.heapArr[0];
            this.heapArr[0] = this.heapArr[this.currentSize - 1];
            this.heapArr[this.currentSize - 1] = tmp;
            this.resList.push({ type: SWAPPED_PAIR, firstIndex: 0, secondIndex: this.currentSize - 1 });
            this.resList.push({ type: PLACED_NUMBER, index: this.currentSize - 1 });
            this.currentSize--;
            this.heapifyDown(0);
        }
    };

    private heapifyDown = (index: number): void => {
        let largest = index;
        const leftChild = 2 * index + 1;
        const rightChild = 2 * index + 2;

        if (leftChild < this.currentSize && this.heapArr[largest] < this.heapArr[leftChild]) {
            largest = leftChild;
        }

        if (rightChild < this.currentSize && this.heapArr[largest] < this.heapArr[rightChild]) {
            largest = rightChild;
        }

        if (largest !== index) {
            this.resList.push({ type: SWAP_PAIR, firstIndex: largest, secondIndex: index });
            const tmp = this.heapArr[index];
            this.heapArr[index] = this.heapArr[largest];
            this.heapArr[largest] = tmp;
            this.resList.push({ type: SWAPPED_PAIR, firstIndex: largest, secondIndex: index });
            this.heapifyDown(largest);
        }
    };
}
export const heapSort = (sortingState: SortingState): SortingAlgorithmResult => {
    const numbers = copyNumbersImmutable(sortingState.sortingList.numberList).map(
        (elem: ArrayStackType) => elem.number,
    );

    const heap = new Heap(numbers);
    heap.heapSort();
    return {
        output: heap.resList,
    };
};
