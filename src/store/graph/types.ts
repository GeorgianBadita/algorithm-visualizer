import { GraphNode, SimpleEdge, WeightedEdge } from '../../algorithms/graph-algorithms/graph';
import { TableNodeType } from '../../containers/GraphContainerAlgorithms';

export const ADD_NODE = 'ADD_NODE';
export const DELETE_NODE = 'DELETE_NODE';
export const ADD_SIMPLE_EDGE = 'ADD_SIMPLE_EDGE';
export const ADD_WEIGHTED_EDGE = 'ADD_WEIGHTED_EDGE';
export const DELETE_EDGE = 'DELETE_EDGE';
export const INIT_GRAPH = 'INIT_GRAPH';
export const CHANGE_SOURCE_NODE = 'CHANGE_SOURCE_NODE';
export const CHANGE_DESTINATION_NODE = 'CAHGNE_DESTINATION_NODE';

interface AddNodeAction {
    type: typeof ADD_NODE;
    node: GraphNode;
    table: TableNodeType[][];
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

interface InitGraphAction {
    type: typeof INIT_GRAPH;
    height: number;
    width: number;
}

interface ChangeSourceNodeAction {
    type: typeof CHANGE_SOURCE_NODE;
    newSource: GraphNode;
}

interface ChangeDestinationNodeAction {
    type: typeof CHANGE_DESTINATION_NODE;
    newDest: GraphNode;
}

export type GraphActionTypes =
    | AddNodeAction
    | DeleteNodeAction
    | AddWeightedEdgeAction
    | DeleteEdgeAction
    | AddSimpleEdgeAction
    | InitGraphAction
    | ChangeSourceNodeAction
    | ChangeDestinationNodeAction;
