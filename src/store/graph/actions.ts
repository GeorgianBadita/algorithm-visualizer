import { GraphNode } from '../../algorithms/graph-algorithms/graph';
import { TableNodeType } from '../../utils/types/graph-types/table-node-type';
import {
    GraphActionTypes,
    ADD_NODE,
    DELETE_NODE,
    INIT_GRAPH,
    CHANGE_SOURCE_NODE,
    CHANGE_DESTINATION_NODE,
    ADD_WEIGHTED_NODE,
    CLEAR_GRAPH,
    RESET_GRAPH_FOR_NEW_ALGORITHM,
    CHANGE_TABLE,
} from './types';

export const addNode = (node: GraphNode, table: TableNodeType[][]): GraphActionTypes => ({
    type: ADD_NODE,
    node: node,
    table: table,
});

export const addWeightedNode = (node: GraphNode, table: TableNodeType[][]): GraphActionTypes => ({
    type: ADD_WEIGHTED_NODE,
    node: node,
    table: table,
});

export const deleteNode = (node: GraphNode): GraphActionTypes => ({
    type: DELETE_NODE,
    node: node,
});

export const initGraph = (height: number, width: number): GraphActionTypes => ({
    type: INIT_GRAPH,
    height: height,
    width: width,
});

export const changeSourceNode = (newSource: GraphNode): GraphActionTypes => ({
    type: CHANGE_SOURCE_NODE,
    newSource: newSource,
});

export const changeDestinationNode = (newDest: GraphNode): GraphActionTypes => ({
    type: CHANGE_DESTINATION_NODE,
    newDest: newDest,
});

export const clearGraph = (): GraphActionTypes => ({
    type: CLEAR_GRAPH,
});

export const changeTable = (newTable: TableNodeType[][]): GraphActionTypes => ({
    type: CHANGE_TABLE,
    table: newTable,
});

export const resetGraphForNewAlgorithm = (): GraphActionTypes => ({
    type: RESET_GRAPH_FOR_NEW_ALGORITHM,
});
