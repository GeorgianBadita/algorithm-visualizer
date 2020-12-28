import { Edges, GraphNode } from '../../algorithms/graph-algorithms/graph';
import { generateRandomNumber } from '../../utils/app-utils-functions';
import {
    DESTINATION_NODE,
    SHORTEST_PATH_NODE,
    SIMPLE_NODE,
    SOURCE_NODE,
    VISITED_NODE,
    VISITED_WEIGHT_NODE,
    VISITED_WEIGHT_SHORTEST_PATH_NODE,
    WEIGHTED_NODE,
} from '../../utils/types/graph-types/node-type';
import {
    copyTableImmutable,
    fromIndexToPair,
    fromPairToIndex,
    getWeightFromNode,
    isBlockedNode,
    validCoords,
} from '../../utils/graph-utils-functions';
import { GraphState } from './state';

import {
    ADD_NODE,
    ADD_WEIGHTED_NODE,
    CHANGE_DESTINATION_NODE,
    CHANGE_SOURCE_NODE,
    CHANGE_TABLE,
    CLEAR_GRAPH,
    DELETE_NODE,
    GraphActionTypes,
    INIT_GRAPH,
    RESET_GRAPH_FOR_NEW_ALGORITHM,
} from './types';
import { TableNodeType } from '../../utils/types/graph-types/table-node-type';

export const initialGraphState: GraphState = {
    numberOfNodes: 0,
    nodes: [],
    edges: {},
    source: null,
    destination: null,
    height: 0,
    width: 0,
    table: [[]] as TableNodeType[][],
    initializedtable: false,
};

const initData = (height: number, width: number): TableNodeType[][] => {
    return Array(height)
        .fill(null)
        .map(() => Array(width).fill({ nodeType: SIMPLE_NODE }));
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
                    if (table[adjRow][adjCol].nodeType === WEIGHTED_NODE) {
                        newEdges[node.id].push({
                            id: adjId,
                            weight: getWeightFromNode(adjId, state.nodes),
                        } as GraphNode);
                    } else {
                        newEdges[node.id].push({
                            id: adjId,
                        } as GraphNode);
                    }
                }

                if (!isAdjBlocked && !newEdges[adjId].includes({ id: node.id } as GraphNode)) {
                    newEdges[adjId].push({ id: node.id, weight: node.weight } as GraphNode);
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
            table: copyTableImmutable(state.table),
            initializedtable: state.initializedtable,
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
        table: copyTableImmutable(state.table),
        initializedtable: state.initializedtable,
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

    const source = { id: `${generateRandomNumber(0, height * width)}` } as GraphNode;
    const destination = { id: `${generateRandomNumber(0, height * width)}` } as GraphNode;

    const src = fromIndexToPair(parseInt(source.id, 10), width);
    const dst = fromIndexToPair(parseInt(destination.id, 10), width);
    const table = initData(height, width);

    table[src.row][src.col] = { nodeType: SOURCE_NODE };
    table[dst.row][dst.col] = { nodeType: DESTINATION_NODE };

    return {
        numberOfNodes: numberOfNodes,
        nodes: nodes,
        edges: edges,
        source: source,
        destination: destination,
        width: width,
        height: height,
        table: table,
        initializedtable: true,
    };
};

const changeSourceNode = (newSource: GraphNode, state: GraphState): GraphState => {
    const table = copyTableImmutable(state.table);
    const { row, col } = fromIndexToPair(parseInt(state.source?.id || '0', 10), state.width);
    table[row][col] = { nodeType: SIMPLE_NODE };
    const p1 = fromIndexToPair(parseInt(newSource.id, 10), state.width);
    table[p1.row][p1.col] = { nodeType: SOURCE_NODE };
    return {
        ...state,
        source: newSource,
    };
};

const changeDestinationNode = (newDest: GraphNode, state: GraphState): GraphState => {
    const table = copyTableImmutable(state.table);
    const { row, col } = fromIndexToPair(parseInt(state.destination?.id || '0', 10), state.width);
    table[row][col] = { nodeType: SIMPLE_NODE };
    const p1 = fromIndexToPair(parseInt(newDest.id, 10), state.width);
    table[p1.row][p1.col] = { nodeType: DESTINATION_NODE };
    return {
        ...state,
        destination: newDest,
    };
};

const clearGraph = (state: GraphState): GraphState => ({
    ...initGraph(state.height, state.width),
    source: state.source,
    destination: state.destination,
    table: copyTableImmutable(state.table).map((row: TableNodeType[]) =>
        row.map((elem: TableNodeType) =>
            elem.nodeType === SOURCE_NODE || elem.nodeType === DESTINATION_NODE ? elem : { nodeType: SIMPLE_NODE },
        ),
    ),
});

const resetGraphForNewAlgorithm = (state: GraphState): GraphState => {
    const newTable = copyTableImmutable(state.table).map((row: TableNodeType[]) =>
        row.map((elem: TableNodeType) => {
            if (elem.nodeType === SHORTEST_PATH_NODE || elem.nodeType === VISITED_NODE) {
                return { nodeType: SIMPLE_NODE } as TableNodeType;
            } else if (elem.nodeType === VISITED_WEIGHT_NODE || elem.nodeType === VISITED_WEIGHT_SHORTEST_PATH_NODE) {
                return { nodeType: WEIGHTED_NODE, weight: elem.weight } as TableNodeType;
            } else if (elem.nodeType === WEIGHTED_NODE) {
                return elem;
            }

            return { nodeType: elem.nodeType } as TableNodeType;
        }),
    );
    return {
        ...state,
        table: newTable,
        source: state.source,
        destination: state.destination,
    };
};

const changeTable = (newTable: TableNodeType[][], state: GraphState): GraphState => {
    return {
        ...state,
        table: copyTableImmutable(newTable),
    };
};

export const graphReducer = (state = initialGraphState, action: GraphActionTypes): GraphState => {
    switch (action.type) {
        case ADD_NODE:
            return addNodeToGraph(action.node, action.table, state);
        case ADD_WEIGHTED_NODE:
            return addNodeToGraph(action.node, action.table, deleteNodeFromGraph(action.node, state));
        case DELETE_NODE:
            return deleteNodeFromGraph(action.node, state);
        case INIT_GRAPH:
            return initGraph(action.height, action.width);
        case CHANGE_SOURCE_NODE:
            return changeSourceNode(action.newSource, state);
        case CHANGE_DESTINATION_NODE:
            return changeDestinationNode(action.newDest, state);
        case CLEAR_GRAPH:
            return clearGraph(state);
        case CHANGE_TABLE:
            return changeTable(action.table, state);
        case RESET_GRAPH_FOR_NEW_ALGORITHM:
            return resetGraphForNewAlgorithm(state);
        default:
            return state;
    }
};
