export const UNVISITED_STACK = 'UNVISITED_STACK';
export const SWAP_STACK = 'SWAP_STACK';
export const CURRENT_STACK = 'CURRENT_STACK';
export const PUT_IN_PLACE = 'PUT_IN_PLACE';
export const MERGING_STACK = 'MERGING_STACK';
export const LEFT_TO_MERGE_STACK = 'LEFT_TO_MERGE_STACK';

export type SortingStackType =
    | typeof UNVISITED_STACK
    | typeof SWAP_STACK
    | typeof CURRENT_STACK
    | typeof PUT_IN_PLACE
    | typeof MERGING_STACK
    | typeof LEFT_TO_MERGE_STACK;
