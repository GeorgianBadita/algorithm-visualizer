import { SortingState } from '../../store/sorting/state';
import { copyNumbersImmutable } from '../../utils/sorting-utils-functions';
import { ArrayStackType } from '../../utils/types/sorting-types/array-stack-type';
import {
    CURRENT_INDEX,
    SortingAlgorithmResult,
    SortingOutputElementType,
} from '../../utils/types/sorting-types/sorting-results-types';

class Heap {
    readonly heapArr: (number | null)[];
    readonly heapSize: number;
    readonly resList: SortingOutputElementType[];
    private currentSize: number;
    //relation should return < 0 if a < b, 0 if a=b and > 0 if a > b
    readonly relation: (a: number | null, b: number | null) => number;

    constructor(numbers: (number | null)[], relation: (a: number | null, b: number | null) => number) {
        this.heapSize = numbers.length;
        this.currentSize = numbers.length;
        this.relation = relation;
        this.heapArr = numbers;
        this.resList = [];
        this.heapify;
    }

    public heapify = (): void => {
        const currIdx = ((this.currentSize / 2) | 0) - 1;
        for (let i = currIdx; i > 0; i--) {
            this.heapifyDown(currIdx);
        }
    };

    public addToHeap = (elem: number): void => {
        if (this.currentSize == this.heapSize) {
            throw 'Heap is full!';
        }
        // this.resList.push({type: CURRENT_INDEX, index: this.})
        this.heapArr[this.currentSize] = elem;
        this.currentSize += 1;
        this.heapifyUp(this.currentSize - 1);
    };

    public top = (): number | null => {
        if (this.currentSize == 0) {
            throw 'Heap is empty!';
        }

        const toReturn = this.heapArr[0];
        this.heapArr[0] = this.heapArr[this.currentSize - 1];
        this.heapArr[this.currentSize - 1] = null;
        this.currentSize--;
        this.heapifyDown(0);
        return toReturn;
    };

    public heapSort = (): void => {
        for (let i = 0; i < this.heapSize; i++) {
            const topElem = this.top();
            this.heapArr[this.currentSize] = topElem;
        }
    };

    private getLeftChild = (index: number): number | null => {
        if (2 * index + 1 < this.currentSize) {
            return 2 * index + 1;
        }
        return null;
    };

    private getRightChild = (index: number): number | null => {
        if (2 * index + 2 < this.currentSize) {
            return 2 * index + 2;
        }
        return null;
    };

    private getParent = (index: number): number | null => {
        if (index >= this.currentSize) {
            return null;
        }
        return index % 2 === 0 ? ((index - 1) / 2) | 0 : (index / 2) | 0;
    };

    private heapifyUp = (index: number): void => {
        let currentIndex = index;
        let parentIndex = this.getParent(currentIndex);
        if (parentIndex === null) {
            return;
        }
        while (
            currentIndex !== null &&
            parentIndex !== null &&
            this.relation(this.heapArr[parentIndex], this.heapArr[currentIndex]) > 0
        ) {
            const tmp = this.heapArr[parentIndex];
            this.heapArr[parentIndex] = this.heapArr[currentIndex];
            this.heapArr[currentIndex] = tmp;
            currentIndex = parentIndex;
            parentIndex = this.getParent(parentIndex);
        }
    };

    private heapifyDown = (index: number): void => {
        let currentIndex = index;

        while (currentIndex !== null) {
            const leftChild = this.getLeftChild(currentIndex);
            const rightChild = this.getRightChild(currentIndex);

            if (leftChild === null) {
                break;
            }

            if (
                (rightChild !== null &&
                    this.relation(this.heapArr[currentIndex], this.heapArr[leftChild]) <= 0 &&
                    this.relation(this.heapArr[currentIndex], this.heapArr[rightChild]) <= 0) ||
                (rightChild === null && this.relation(this.heapArr[currentIndex], this.heapArr[leftChild]) <= 0)
            ) {
                break;
            }

            let toSwap = leftChild;
            if (
                rightChild &&
                this.relation(this.heapArr[currentIndex], this.heapArr[leftChild]) <
                    this.relation(this.heapArr[currentIndex], this.heapArr[rightChild])
            ) {
                toSwap = rightChild;
            }
            const tmp = this.heapArr[currentIndex];
            this.heapArr[currentIndex] = this.heapArr[toSwap];
            this.heapArr[toSwap] = tmp;

            currentIndex = toSwap;
        }
    };
}

const relation = (a: number | null, b: number | null): number => {
    if (a === null || b === null) {
        return 0;
    }
    return -a + b;
};

export const heapSort = (sortingState: SortingState): SortingAlgorithmResult => {
    const numbers = copyNumbersImmutable(sortingState.sortingList.numberList).map(
        (elem: ArrayStackType) => elem.number,
    );

    const heap = new Heap(numbers, relation);
    heap.heapSort();

    return {
        output: heap.resList,
    };
};
