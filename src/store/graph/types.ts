import { GraphNode } from '../../algorithms/graph-algorithms/graph';
import { TableNodeType } from '../../utils/types/graph-types/table-node-type';

export const ADD_NODE = 'ADD_NODE';
export const ADD_WEIGHTED_NODE = 'ADD_WEIGHTED_NODE';
export const DELETE_NODE = 'DELETE_NODE';
export const INIT_GRAPH = 'INIT_GRAPH';
export const CHANGE_SOURCE_NODE = 'CHANGE_SOURCE_NODE';
export const CHANGE_DESTINATION_NODE = 'CAHGNE_DESTINATION_NODE';
export const CLEAR_GRAPH = 'CLEAR_GRAPH';
export const CHANGE_TABLE = 'CHANGE_TABLE';
export const RESET_GRAPH_FOR_NEW_ALGORITHM = 'RESET_GRAPH_FOR_NEW_ALGORITHM';

interface AddNodeAction {
    type: typeof ADD_NODE;
    node: GraphNode;
    table: TableNodeType[][];
}

interface AddWeightedNodeAction {
    type: typeof ADD_WEIGHTED_NODE;
    node: GraphNode;
    table: TableNodeType[][];
}

interface DeleteNodeAction {
    type: typeof DELETE_NODE;
    node: GraphNode;
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

interface ClearGraphAction {
    type: typeof CLEAR_GRAPH;
}

interface ChangeTableAction {
    type: typeof CHANGE_TABLE;
    table: TableNodeType[][];
}

interface ResetGraphForNewAlgorithmAction {
    type: typeof RESET_GRAPH_FOR_NEW_ALGORITHM;
}

export type GraphActionTypes =
    | AddNodeAction
    | AddWeightedNodeAction
    | DeleteNodeAction
    | InitGraphAction
    | ChangeSourceNodeAction
    | ChangeDestinationNodeAction
    | ClearGraphAction
    | ChangeTableAction
    | ResetGraphForNewAlgorithmAction;
