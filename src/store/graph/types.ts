import { GraphNode, SimpleEdge, WeightedEdge } from '../../algorithms/graph-algorithms/graph';

export const ADD_NODE = 'ADD_NODE';
export const DELETE_NODE = 'DELETE_NODE';
export const ADD_SIMPLE_EDGE = 'ADD_SIMPLE_EDGE';
export const ADD_WEIGHTED_EDGE = 'ADD_WEIGHTED_EDGE';
export const DELETE_EDGE = 'DELETE_EDGE';

interface AddNodeAction {
    type: typeof ADD_NODE;
    node: GraphNode;
}

interface DeleteNodeAction {
    type: typeof DELETE_NODE;
    node: GraphNode;
}

interface AddSimpleEdgeAction {
    type: typeof ADD_SIMPLE_EDGE;
    edge: SimpleEdge;
}

interface AddWeightedEdgeAction {
    type: typeof ADD_WEIGHTED_EDGE;
    weightedEdge: WeightedEdge;
}

interface DeleteEdgeAction {
    type: typeof DELETE_EDGE;
    edge: {
        from: GraphNode;
        to: GraphNode;
    };
}

export type GraphActionTypes =
    | AddNodeAction
    | DeleteNodeAction
    | AddWeightedEdgeAction
    | DeleteEdgeAction
    | AddSimpleEdgeAction;
