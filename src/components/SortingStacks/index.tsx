import React from 'react';
import { ArrayStackType } from '../../utils/types/sorting-types/array-stack-type';
import { SortingStack } from './SortingStack';
import classes from './SortingStacks.module.css';

type SortingStacksProps = {
    heights: ArrayStackType[];
};

export const SortingStacks = (props: SortingStacksProps): JSX.Element => {
    let width = 5;
    if (props.heights.length <= 10) {
        width = 20;
    } else if (props.heights.length > 40) {
        width = 2;
    }
    return (
        <div className={classes.sortingStacks}>
            {props.heights.map((elem: ArrayStackType) => (
                <SortingStack height={elem.number} stackType={elem.elemType} width={width} />
            ))}
        </div>
    );
};
