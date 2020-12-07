import { GraphNode } from '../../algorithms/graph-algorithms/graph';
import { TableNodeType } from '../../containers/GraphContainerAlgorithms';
import { GraphAlgoirhtmsType } from '../../utils/types/graph-algorithms/algorithm-types';
import {
    GraphActionTypes,
    ADD_NODE,
    DELETE_NODE,
    ADD_SIMPLE_EDGE,
    ADD_WEIGHTED_EDGE,
    DELETE_EDGE,
    INIT_GRAPH,
    CHANGE_SOURCE_NODE,
    CHANGE_DESTINATION_NODE,
    ADD_WEIGHTED_NODE,
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

export const addSimpleEdge = (from: GraphNode, to: GraphNode): GraphActionTypes => ({
    type: ADD_SIMPLE_EDGE,
    edge: {
        from: from,
        to: to,
    },
});

export const addWeightedEdge = (from: GraphNode, to: GraphNode, weight: number): GraphActionTypes => ({
    type: ADD_WEIGHTED_EDGE,
    weightedEdge: {
        from: from,
        to: to,
        weight: weight,
    },
});

export const deleteEdge = (from: GraphNode, to: GraphNode): GraphActionTypes => ({
    type: DELETE_EDGE,
    edge: {
        from: from,
        to: to,
    },
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
