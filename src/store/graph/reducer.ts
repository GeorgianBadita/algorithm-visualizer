import { Edges, GraphNode, SimpleEdge, WeightedEdge } from '../../algorithms/graph-algorithms/graph';
import { validCoords } from '../../utils/utilsFunctions';
import { GraphState } from './state';
import {
    ADD_NODE,
    ADD_SIMPLE_EDGE,
    ADD_WEIGHTED_EDGE,
    DELETE_EDGE,
    DELETE_NODE,
    GraphActionTypes,
    INIT_GRAPH,
} from './types';

const initialGraphState: GraphState = {
    numberOfNodes: 0,
    nodes: [],
    edges: {},
};

const addNodeToGraph = (node: GraphNode, state: GraphState): GraphState => {
    if (!state.nodes.includes(node)) {
        const newEdges = { ...state.edges };
        newEdges[node.id] = [];
        return {
            numberOfNodes: state.numberOfNodes + 1,
            nodes: [...state.nodes, node],
            edges: newEdges,
        };
    }
    return state;
};

const deleteNodeFromGraph = (node: GraphNode, state: GraphState): GraphState => {
    if (state.numberOfNodes === 0) {
        return state;
    }
    const newNumofNodes = state.numberOfNodes - 1;
    const newNodesSet = state.nodes.filter((n: GraphNode) => n.id !== node.id);
    const newEdgeSet = Object.keys(state.edges)
        .filter((key: string) => key !== node.id)
        .reduce((edges: Edges, key: string) => {
            const newAdj = state.edges[key].filter((n: GraphNode) => n.id !== node.id);
            edges[key] = newAdj;
            return edges;
        }, {});

    return {
        numberOfNodes: newNumofNodes,
        nodes: newNodesSet,
        edges: newEdgeSet,
    };
};

const addEdge = (edge: SimpleEdge | WeightedEdge, state: GraphState, isWeighted: boolean): GraphState => {
    if (state.edges[edge.from.id].includes(edge.to)) {
        return state;
    }
    const newEdges = { ...state.edges };
    if (isWeighted) {
        edge.to.weight = (edge as WeightedEdge).weight;
    }
    newEdges[edge.from.id].push(edge.to);
    return {
        numberOfNodes: state.numberOfNodes + 1,
        nodes: [...state.nodes],
        edges: newEdges,
    };
};

const deleteEdge = (edge: SimpleEdge | WeightedEdge, state: GraphState): GraphState => {
    const keys: string[] = Object.keys(state.edges);
    if (!keys.includes(edge.to.id) || !keys.includes(edge.from.id)) {
        return state;
    }
    const newEdges = { ...state.edges };
    newEdges[edge.from.id] = newEdges[edge.from.id].filter((node: GraphNode) => node.id !== edge.to.id);
    newEdges[edge.to.id] = newEdges[edge.to.id].filter((node: GraphNode) => node.id !== edge.from.id);

    return {
        numberOfNodes: state.numberOfNodes,
        nodes: state.nodes,
        edges: newEdges,
    };
};

const initGraph = (height: number, width: number, state: GraphState): GraphState => {
    const numberOfNodes = height * width;
    const nodes = Array.from({ length: numberOfNodes }, (_, i) => i).map((elem) => ({ id: `${elem}` } as GraphNode));
    const edges = nodes.reduce((edgeSet: Edges, node: GraphNode) => ({ ...edgeSet, [node.id]: [] }), {} as Edges);

    for (let node = 0; node < height * width; ++node) {
        const row = node / width;
        const col = node % height;
        //TODO: finish this
    }

    return {
        numberOfNodes: numberOfNodes,
        nodes: nodes,
        edges: edges,
    };
};

export const graphReducer = (state = initialGraphState, action: GraphActionTypes): GraphState => {
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
        case INIT_GRAPH:
            return initGraph(action.height, action.width, state);
        default:
            return state;
    }
};
