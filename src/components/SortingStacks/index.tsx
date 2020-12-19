import React from 'react';
import { ArrayStackType } from '../../utils/types/sorting-types/array-stack-type';
import { SortingStack } from './SortingStack';

type SortingStacksProps = {
    heights: ArrayStackType[];
};

export const SortingStacks = (props: SortingStacksProps): JSX.Element => (
    <>
        {props.heights.map((elem: ArrayStackType) => (
            <SortingStack height={elem.number} stackType={elem.elemType} />
        ))}
    </>
);
