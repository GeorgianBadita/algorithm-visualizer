import { GraphNode } from '../../algorithms/graph-algorithms/graph';
import {
  GraphActionTypes,
  ADD_NODE,
  DELETE_NODE,
  ADD_SIMPLE_EDGE,
  ADD_WEIGHTED_EDGE,
  DELETE_EDGE
} from './types';

export const addNode = (node: GraphNode): GraphActionTypes => ({
  type: ADD_NODE,
  node: node
});

export const deleteNode = (node: GraphNode): GraphActionTypes => ({
  type: DELETE_NODE,
  node: node
});

export const addSimpleEdge = (
  from: GraphNode,
  to: GraphNode
): GraphActionTypes => ({
  type: ADD_SIMPLE_EDGE,
  edge: {
    from: from,
    to: to
  }
});

export const addWeightedEdge = (
  from: GraphNode,
  to: GraphNode,
  weight: number
): GraphActionTypes => ({
  type: ADD_WEIGHTED_EDGE,
  weightedEdge: {
    from: from,
    to: to,
    weight: weight
  }
});

export const deleteEdge = (
  from: GraphNode,
  to: GraphNode
): GraphActionTypes => ({
  type: DELETE_EDGE,
  edge: {
    from: from,
    to: to
  }
});
