import {
  Edges,
  GraphNode,
  SimpleEdge,
  WeightedEdge
} from '../../algorithms/graph-algorithms/graph';
import { GraphState } from './state';
import {
  ADD_NODE,
  ADD_SIMPLE_EDGE,
  ADD_WEIGHTED_EDGE,
  DELETE_EDGE,
  DELETE_NODE,
  GraphActionTypes
} from './types';

const initialGraphState: GraphState = {
  graph: {
    numberOfNodes: 0,
    nodes: [],
    edges: {}
  }
};

const addNodeToGraph = (node: GraphNode, state: GraphState): GraphState => {
  if (!state.graph.nodes.includes(node)) {
    const newEdges = { ...state.graph.edges };
    newEdges[node.id] = [];
    return {
      graph: {
        numberOfNodes: state.graph.numberOfNodes + 1,
        nodes: [...state.graph.nodes, node],
        edges: newEdges
      }
    };
  }
  return state;
};

const deleteNodeFromGraph = (
  node: GraphNode,
  state: GraphState
): GraphState => {
  if (state.graph.numberOfNodes === 0) {
    return state;
  }
  const newNumofNodes = state.graph.numberOfNodes - 1;
  const newNodesSet = state.graph.nodes.filter(
    (n: GraphNode) => n.id !== node.id
  );
  const newEdgeSet = Object.keys(state.graph.edges)
    .filter((key: string) => key !== node.id)
    .reduce((edges: Edges, key: string) => {
      const newAdj = state.graph.edges[key].filter(
        (n: GraphNode) => n.id !== node.id
      );
      edges[key] = newAdj;
      return edges;
    }, {});

  return {
    graph: {
      numberOfNodes: newNumofNodes,
      nodes: newNodesSet,
      edges: newEdgeSet
    }
  };
};

const addEdge = (
  edge: SimpleEdge | WeightedEdge,
  state: GraphState,
  isWeighted: boolean
): GraphState => {
  if (state.graph.edges[edge.from.id].includes(edge.to)) {
    return state;
  }
  const newEdges = { ...state.graph.edges };
  if (isWeighted) {
    edge.to.weight = (edge as WeightedEdge).weight;
  }
  newEdges[edge.from.id].push(edge.to);
  return {
    graph: {
      numberOfNodes: state.graph.numberOfNodes + 1,
      nodes: [...state.graph.nodes],
      edges: newEdges
    }
  };
};

const deleteEdge = (
  edge: SimpleEdge | WeightedEdge,
  state: GraphState
): GraphState => {
  const keys: string[] = Object.keys(state.graph.edges);
  if (!keys.includes(edge.to.id) || !keys.includes(edge.from.id)) {
    return state;
  }
  const newEdges = { ...state.graph.edges };
  newEdges[edge.from.id] = newEdges[edge.from.id].filter(
    (node: GraphNode) => node.id !== edge.to.id
  );
  newEdges[edge.to.id] = newEdges[edge.to.id].filter(
    (node: GraphNode) => node.id !== edge.from.id
  );

  return {
    graph: {
      numberOfNodes: state.graph.numberOfNodes,
      nodes: state.graph.nodes,
      edges: newEdges
    }
  };
};

export const graphReducer = (
  state = initialGraphState,
  action: GraphActionTypes
): GraphState => {
  switch (action.type) {
    case ADD_NODE:
      return addNodeToGraph(action.node, state);
    case DELETE_NODE:
      return deleteNodeFromGraph(action.node, state);
    case ADD_SIMPLE_EDGE:
      return addEdge(action.edge, state, false);
    case ADD_WEIGHTED_EDGE:
      return addEdge(action.weightedEdge, state, false);
    case DELETE_EDGE:
      return deleteEdge(action.edge, state);
    default:
      return state;
  }
};
