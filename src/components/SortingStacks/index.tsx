import React from 'react';
import { useWindowSize } from '../../hooks/hooks';
import { ArrayStackType } from '../../utils/types/sorting-types/array-stack-type';
import { SortingStack } from './SortingStack';
import classes from './SortingStacks.module.css';

type SortingStacksProps = {
    heights: ArrayStackType[];
};

export const SortingStacks = (props: SortingStacksProps): JSX.Element => {
    const [width, _] = useWindowSize();
    const stacksWidth = (width * 0.3) | 0;
    const oneStackWidth = (stacksWidth / props.heights.length) | 0;

    return (
        <div className={classes.sortingStacks}>
            {props.heights.map((elem: ArrayStackType, index: number) => (
                <SortingStack key={index} height={elem.number} stackType={elem.elemType} width={oneStackWidth} />
            ))}
        </div>
    );
};
