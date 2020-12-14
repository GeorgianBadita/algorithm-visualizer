import React from 'react';
import classes from './SortingStack.module.css';
import { DEFAULT_STACK_HEIGHT } from '../../../utils/types/sorting-types/sorting-default-values';

type SortingStackProps = {
    height: number;
};

export const SortingStack = (props: SortingStackProps): JSX.Element => (
    <div className={classes.stack} style={{ height: `${DEFAULT_STACK_HEIGHT + 12 * props.height}px` }}></div>
);
