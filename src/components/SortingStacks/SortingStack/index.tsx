import React from 'react';
import classes from './SortingStack.module.css';
import { DEFAULT_STACK_HEIGHT } from '../../../utils/types/sorting-types/sorting-default-values';
import {
    CURRENT_STACK,
    LEFT_TO_MERGE_STACK,
    MERGING_STACK,
    PUT_IN_PLACE,
    SortingStackType,
    SWAP_STACK,
    UNVISITED_STACK,
} from '../../../utils/types/sorting-types/sorting-stack-type';
import { useWindowSize } from '../../../hooks/hooks';

type SortingStackProps = {
    height: number;
    stackType: SortingStackType;
    width: number;
};

const NOT_NEED_FOR_SCROLLING_HEIGHT = 935;

export const SortingStack = (props: SortingStackProps): JSX.Element => {
    const [, height] = useWindowSize();
    const cssClasses = [classes.stack];
    if (props.stackType === UNVISITED_STACK) {
        cssClasses.push(classes.unvisitedStack);
    }
    if (props.stackType === SWAP_STACK) {
        cssClasses.push(classes.swappingStack);
    }
    if (props.stackType === CURRENT_STACK) {
        cssClasses.push(classes.currentStack);
    }
    if (props.stackType === PUT_IN_PLACE) {
        cssClasses.push(classes.sortInPlaceStack);
    }
    if (props.stackType === MERGING_STACK) {
        cssClasses.push(classes.mergingStack);
    }
    if (props.stackType === LEFT_TO_MERGE_STACK) {
        cssClasses.push(classes.leftToMergeStack);
    }

    let stackHeight = DEFAULT_STACK_HEIGHT + 12 * props.height;
    if (height && height <= NOT_NEED_FOR_SCROLLING_HEIGHT) {
        const diff = (NOT_NEED_FOR_SCROLLING_HEIGHT - height) / 50;
        stackHeight = (stackHeight * (1 - diff / 10)) | 0;
    }
    return (
        <div
            className={cssClasses.join(' ')}
            style={{ height: `${stackHeight}px`, borderWidth: `${props.width}px` }}
        ></div>
    );
};
