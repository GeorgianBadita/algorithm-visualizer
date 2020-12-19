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

type SortingStackProps = {
    height: number;
    stackType: SortingStackType;
    width: number;
};

export const SortingStack = (props: SortingStackProps): JSX.Element => {
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
    return (
        <div
            className={cssClasses.join(' ')}
            style={{ height: `${DEFAULT_STACK_HEIGHT + 12 * props.height}px`, borderWidth: `${props.width}px` }}
        >
            {props.width === 20 ? props.height : ''}
        </div>
    );
};
