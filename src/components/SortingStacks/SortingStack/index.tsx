import React from 'react';
import classes from './SortingStack.module.css';
import { DEFAULT_STACK_HEIGHT } from '../../../utils/types/sorting-types/sorting-default-values';
import {
    CURRENT_STACK,
    PUT_IN_PLACE,
    SortingStackType,
    SWAP_STACK,
    UNVISITED_STACK,
} from '../../../utils/types/sorting-types/sorting-stack-type';

type SortingStackProps = {
    height: number;
    stackType: SortingStackType;
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
    return (
        <div className={cssClasses.join(' ')} style={{ height: `${DEFAULT_STACK_HEIGHT + 12 * props.height}px` }}></div>
    );
};
