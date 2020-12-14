import React from 'react';
import { SortingStack } from './SortingStack';

type SortingStacksProps = {
    heights: number[];
};

export const SortingStacks = (props: SortingStacksProps): JSX.Element => (
    <>
        {props.heights.map((height: number) => (
            <SortingStack height={height} />
        ))}
    </>
);
