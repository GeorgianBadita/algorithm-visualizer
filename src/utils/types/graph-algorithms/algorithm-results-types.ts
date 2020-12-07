import { GraphNode, ParentVectorType } from '../../../algorithms/graph-algorithms/graph';

export type GraphAlgOutput = {
    visitedNodes: GraphNode[];
    parentVector: ParentVectorType;
};

export type GraphAlgorithmResult = {
    visitedNodesInOrder: Pair[];
    shortestPath: Pair[];
};

export type Pair = {
    row: number;
    col: number;
    weight?: number;
};
