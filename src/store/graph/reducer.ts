import { Edges, GraphNode, SimpleEdge, WeightedEdge } from '../../algorithms/graph-algorithms/graph';
import { TableNodeType } from '../../containers/GraphContainerAlgorithms';
import {
    fromIndexToPair,
    fromPairToIndex,
    generateRandomNumber,
    isBlockedNode,
    validCoords,
} from '../../utils/utilsFunctions';
import { GraphState } from './state';
import {
    ADD_NODE,
    ADD_SIMPLE_EDGE,
    ADD_WEIGHTED_EDGE,
    CHANGE_DESTINATION_NODE,
    CHANGE_SOURCE_NODE,
    DELETE_EDGE,
    DELETE_NODE,
    GraphActionTypes,
    INIT_GRAPH,
} from './types';

export const initialGraphState: GraphState = {
    numberOfNodes: 0,
    nodes: [],
    edges: {},
    source: null,
    destination: null,
    height: 0,
    width: 0,
};

const addNodeToGraph = (node: GraphNode, table: TableNodeType[][], state: GraphState): GraphState => {
    if (!state.nodes.some((elem: GraphNode) => elem.id === node.id)) {
        const newEdges = { ...state.edges };
        newEdges[node.id] = [];
        const { row, col } = fromIndexToPair(parseInt(node.id, 10), state.width);
        const dx = [-1, 0, 0, 1];
        const dy = [0, -1, 1, 0];

        for (let dir = 0; dir < 4; ++dir) {
            const adjRow = row + dx[dir];
            const adjCol = col + dy[dir];
            if (validCoords(adjRow, adjCol, state.height, state.width)) {
                const adjId = `${fromPairToIndex({ row: adjRow, col: adjCol }, state.width)}`;
                const isAdjBlocked = isBlockedNode({ row: adjRow, col: adjCol }, table);
                if (!isAdjBlocked && !newEdges[node.id].includes({ id: adjId } as GraphNode)) {
                    newEdges[node.id].push({
                        id: adjId,
                    } as GraphNode);
                }

                if (!isAdjBlocked && !newEdges[adjId].includes({ id: node.id } as GraphNode)) {
                    newEdges[adjId].push({ id: node.id } as GraphNode);
                }
            }
        }

        return {
            numberOfNodes: state.numberOfNodes + 1,
            nodes: [...state.nodes, node],
            edges: newEdges,
            source: state.source,
            destination: state.destination,
            height: state.height,
            width: state.width,
        };
    }
    return state;
};

const deleteNodeFromGraph = (node: GraphNode, state: GraphState): GraphState => {
    if (state.numberOfNodes === 0 || !state.nodes.some((elem: GraphNode) => elem.id === node.id)) {
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
        source: state.source,
        destination: state.destination,
        height: state.height,
        width: state.width,
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
        source: state.source,
        destination: state.destination,
        height: state.height,
        width: state.width,
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
        source: state.source,
        destination: state.destination,
        height: state.height,
        width: state.width,
    };
};

const initGraph = (height: number, width: number): GraphState => {
    const numberOfNodes = height * width;
    const nodes = Array.from({ length: numberOfNodes }, (_, i) => i).map((elem) => ({ id: `${elem}` } as GraphNode));
    const edges = nodes.reduce((edgeSet: Edges, node: GraphNode) => ({ ...edgeSet, [node.id]: [] }), {} as Edges);
    const dx = [-1, 0, 0, 1];
    const dy = [0, -1, 1, 0];

    for (let node = 0; node < height * width; ++node) {
        const { row, col } = fromIndexToPair(node, width);
        for (let dir = 0; dir < 4; ++dir) {
            const adjRow = row + dx[dir];
            const adjCol = col + dy[dir];
            if (validCoords(adjRow, adjCol, height, width)) {
                edges[`${node}`].push({ id: `${fromPairToIndex({ row: adjRow, col: adjCol }, width)}` } as GraphNode);
            }
        }
    }

    return {
        numberOfNodes: numberOfNodes,
        nodes: nodes,
        edges: edges,
        source: { id: `${generateRandomNumber(0, height * width)}` } as GraphNode,
        destination: { id: `${generateRandomNumber(0, height * width)}` } as GraphNode,
        width: width,
        height: height,
    };
};

const changeSourceNode = (newSource: GraphNode, state: GraphState): GraphState => ({
    ...state,
    source: newSource,
});

const changeDestinationNode = (newDest: GraphNode, state: GraphState): GraphState => ({
    ...state,
    destination: newDest,
});

export const graphReducer = (state = initialGraphState, action: GraphActionTypes): GraphState => {
    switch (action.type) {
        case ADD_NODE:
            return addNodeToGraph(action.node, action.table, state);
        case DELETE_NODE:
            return deleteNodeFromGraph(action.node, state);
        case ADD_SIMPLE_EDGE:
            return addEdge(action.edge, state, false);
        case ADD_WEIGHTED_EDGE:
            return addEdge(action.weightedEdge, state, false);
        case DELETE_EDGE:
            return deleteEdge(action.edge, state);
        case INIT_GRAPH:
            return initGraph(action.height, action.width);
        case CHANGE_SOURCE_NODE:
            return changeSourceNode(action.newSource, state);
        case CHANGE_DESTINATION_NODE:
            return changeDestinationNode(action.newDest, state);
        default:
            return state;
    }
};
