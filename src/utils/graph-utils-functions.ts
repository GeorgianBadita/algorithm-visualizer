import { bfs } from '../algorithms/graph-algorithms/bfs';
import { Graph, GraphNode, ParentVectorType } from '../algorithms/graph-algorithms/graph';
import {
    A_STAR,
    BEST_FIRST_SEARCH,
    BREADTH_FIRST_SEARCH,
    DIJKSTRA_ALGORITHM,
    GraphAlgoirhtmsType,
    NO_ALGORITHM,
} from './types/graph-types/graph-algorithm-types';
import {
    DESTINATION_NODE,
    SHORTEST_PATH_NODE,
    SIMPLE_NODE,
    SOURCE_NODE,
    VISITED_NODE,
    VISITED_WEIGHT_NODE,
    VISITED_WEIGHT_SHORTEST_PATH_NODE,
    WALL_NODE,
    WEIGHTED_NODE,
} from './types/graph-types/node-type';
import {
    DESTINATION_NODE_BUTTON,
    NodeTypeButtonType,
    RESTORE_NODE_BUTTON,
    SOURCE_NODE_BUTTON,
    WALL_NODE_BUTTON,
    WEIGHTED_NODE_BUTTON,
} from './types/graph-types/node-type-button-type';
import { GraphState } from '../store/graph/state';
import { GraphAlgorithmResult, GraphAlgOutput, Pair } from './types/graph-types/graph-results-types';
import { dijkstra } from '../algorithms/graph-algorithms/dijkstra';

import { aStar } from '../algorithms/graph-algorithms/a_star';
import { bestFirstSearch } from '../algorithms/graph-algorithms/best-first-search';
import { AlgorithmType } from './types/app-types/algorithm-classes-types';
import { createErrorToast } from './app-utils-functions';
import { graphAlgorithms } from './types/graph-types/consts';
import { TableNodeType } from './types/graph-types/table-node-type';

export const validCoords = (x: number, y: number, height: number, width: number): boolean => {
    return x >= 0 && y >= 0 && x < height && y < width;
};

export const fromIndexToPair = (index: number, width: number, weight?: number): Pair => {
    return {
        row: (index / width) | 0,
        col: index % width,
        weight: weight,
    };
};

export const fromPairToIndex = (pair: Pair, width: number): number => {
    return pair.row * width + pair.col;
};

export const copyTableImmutable = (table: TableNodeType[][]): TableNodeType[][] => {
    return table.map((arr: TableNodeType[]) => {
        return arr.map((elem: TableNodeType) => ({ ...elem } as TableNodeType));
    }) as TableNodeType[][];
};

export const wasAlgorithmRunning = (table: TableNodeType[][]): boolean => {
    return table.some((row: TableNodeType[]) =>
        row.some(
            (elem: TableNodeType) =>
                elem.nodeType === VISITED_NODE ||
                elem.nodeType === VISITED_WEIGHT_NODE ||
                elem.nodeType === SHORTEST_PATH_NODE ||
                elem.nodeType === VISITED_WEIGHT_SHORTEST_PATH_NODE,
        ),
    );
};

export const getNewGrid = (
    table: TableNodeType[][],
    activeNodeTypeButton: NodeTypeButtonType,
    x: number,
    y: number,
): TableNodeType[][] => {
    switch (activeNodeTypeButton) {
        case WALL_NODE_BUTTON: {
            if (table[x][y].nodeType !== SIMPLE_NODE && table[x][y].nodeType !== WEIGHTED_NODE) {
                return table as TableNodeType[][];
            }
            const newTable = copyTableImmutable(table);
            newTable[x][y] = { nodeType: WALL_NODE } as TableNodeType;
            return newTable;
        }
        case WEIGHTED_NODE_BUTTON: {
            if (table[x][y].nodeType !== SIMPLE_NODE && table[x][y].nodeType !== WALL_NODE) {
                return table as TableNodeType[][];
            }

            const newTable = copyTableImmutable(table);
            newTable[x][y] = { nodeType: WEIGHTED_NODE, weight: 10 } as TableNodeType;
            return newTable;
        }
        case RESTORE_NODE_BUTTON: {
            if (
                table[x][y].nodeType === SOURCE_NODE ||
                table[x][y].nodeType === DESTINATION_NODE ||
                table[x][y].nodeType === SIMPLE_NODE ||
                table[x][y].nodeType === VISITED_NODE ||
                table[x][y].nodeType === VISITED_WEIGHT_NODE ||
                table[x][y].nodeType === SHORTEST_PATH_NODE ||
                table[x][y].nodeType === VISITED_WEIGHT_SHORTEST_PATH_NODE
            ) {
                return table as TableNodeType[][];
            }

            const newTable = copyTableImmutable(table);
            newTable[x][y].nodeType = SIMPLE_NODE;
            newTable[x][y].weight = undefined;
            return newTable;
        }
        case SOURCE_NODE_BUTTON: {
            if (table[x][y].nodeType !== SIMPLE_NODE) {
                return table as TableNodeType[][];
            }
            if (wasAlgorithmRunning(table)) {
                createErrorToast('You cannot move the source node, on a visited graph');
                return table as TableNodeType[][];
            }
            const newTable = copyTableImmutable(table).map((row: TableNodeType[]): TableNodeType[] => {
                return row.map(
                    (elem: TableNodeType): TableNodeType => {
                        if (elem.nodeType === SOURCE_NODE) {
                            return { nodeType: SIMPLE_NODE } as TableNodeType;
                        }
                        return elem as TableNodeType;
                    },
                );
            });

            newTable[x][y].nodeType = SOURCE_NODE;
            return newTable;
        }
        case DESTINATION_NODE_BUTTON: {
            const condition = !window.experimental
                ? table[x][y].nodeType !== SIMPLE_NODE
                : table[x][y].nodeType !== SIMPLE_NODE &&
                  table[x][y].nodeType !== VISITED_NODE &&
                  table[x][y].nodeType !== SHORTEST_PATH_NODE;

            if (condition) {
                return table as TableNodeType[][];
            }

            if (!window.experimental && wasAlgorithmRunning(table)) {
                createErrorToast('You cannot move the destination node, on a visited graph');
                return table as TableNodeType[][];
            }

            const newTable = copyTableImmutable(table).map((row: TableNodeType[]): TableNodeType[] => {
                return row.map(
                    (elem: TableNodeType): TableNodeType => {
                        if (elem.nodeType === DESTINATION_NODE) {
                            return { nodeType: SIMPLE_NODE } as TableNodeType;
                        }
                        return elem as TableNodeType;
                    },
                );
            });

            newTable[x][y] = { nodeType: DESTINATION_NODE };
            return newTable;
        }
        default:
            return table;
    }
};

export const reduxGraphUpdateDispatchHelper = (
    table: TableNodeType[][],
    activeNodeButton: NodeTypeButtonType,
    changeSourceNodeHandler: (x: GraphNode) => void,
    changeDestinationNodeHandler: (x: GraphNode) => void,
    deleteNodeHandler: (node: GraphNode) => void,
    addNodeHandler: (node: GraphNode, table: TableNodeType[][]) => void,
    addWeightedNodeHandler: (node: GraphNode, table: TableNodeType[][]) => void,
    x: number,
    y: number,
    width: number,
    weight?: number,
): void => {
    switch (activeNodeButton) {
        case SOURCE_NODE_BUTTON:
            if (table[x][y].nodeType !== SIMPLE_NODE) {
                break;
            }
            if (wasAlgorithmRunning(table)) {
                break;
            }
            changeSourceNodeHandler({ id: `${fromPairToIndex({ row: x, col: y }, width)}` });

            break;
        case DESTINATION_NODE_BUTTON: {
            const condition = !window.experimental
                ? table[x][y].nodeType !== SIMPLE_NODE
                : table[x][y].nodeType !== SIMPLE_NODE &&
                  table[x][y].nodeType !== VISITED_NODE &&
                  table[x][y].nodeType !== SHORTEST_PATH_NODE;

            if (condition) {
                break;
            }

            if (!window.experimental && wasAlgorithmRunning(table)) {
                break;
            }

            changeDestinationNodeHandler({ id: `${fromPairToIndex({ row: x, col: y }, width)}` });
            break;
        }
        case WALL_NODE_BUTTON:
            if (table[x][y].nodeType !== SIMPLE_NODE && table[x][y].nodeType !== WEIGHTED_NODE) {
                break;
            }

            deleteNodeHandler({ id: `${fromPairToIndex({ row: x, col: y }, width)}` });
            break;
        case WEIGHTED_NODE_BUTTON: {
            if (table[x][y].nodeType !== SIMPLE_NODE && table[x][y].nodeType !== WALL_NODE) {
                break;
            }
            addWeightedNodeHandler({ id: `${fromPairToIndex({ row: x, col: y }, width)}`, weight: weight }, table);
            break;
        }
        case RESTORE_NODE_BUTTON:
            if (
                table[x][y].nodeType === SOURCE_NODE ||
                table[x][y].nodeType === DESTINATION_NODE ||
                table[x][y].nodeType === SIMPLE_NODE ||
                table[x][y].nodeType === VISITED_NODE ||
                table[x][y].nodeType === VISITED_WEIGHT_NODE ||
                table[x][y].nodeType === SHORTEST_PATH_NODE ||
                table[x][y].nodeType === VISITED_WEIGHT_SHORTEST_PATH_NODE
            ) {
                break;
            }
            deleteNodeHandler({ id: `${fromPairToIndex({ row: x, col: y }, width)}` });
            addNodeHandler({ id: `${fromPairToIndex({ row: x, col: y }, width)}` }, table);
            break;
        default:
            break;
    }
};

export const isBlockedNode = (coords: Pair, table: TableNodeType[][]): boolean => {
    return table[coords.row][coords.col].nodeType === WALL_NODE;
};

export const algNameToAlgType = (algName: string): GraphAlgoirhtmsType => {
    switch (algName) {
        case "Dijkstra's Algorithm": {
            return DIJKSTRA_ALGORITHM as GraphAlgoirhtmsType;
        }
        case 'Breadth First Search': {
            return BREADTH_FIRST_SEARCH as GraphAlgoirhtmsType;
        }
        case 'A* Algorithm': {
            return A_STAR;
        }
        case 'Best First Search': {
            return BEST_FIRST_SEARCH;
        }
        default:
            return NO_ALGORITHM as GraphAlgoirhtmsType;
    }
};

const fromGraphNodesToPairs = (graphNodes: GraphNode[], width: number): Pair[] => {
    return graphNodes.map((elem: GraphNode) => fromIndexToPair(parseInt(elem.id, 10), width, elem.weight));
};

export const getShortestPath = (
    source: GraphNode,
    destination: GraphNode,
    parentVector: ParentVectorType,
): GraphNode[] => {
    const result: GraphNode[] = [];
    let currentNode = destination;
    while (currentNode !== undefined && currentNode.id !== source.id) {
        result.push({ ...currentNode });
        currentNode = parentVector[currentNode.id];
    }
    result.shift();
    return result.reverse();
};

export const getVisitedNodes = (algType: AlgorithmType, graphState: GraphState): GraphAlgorithmResult => {
    switch (algType) {
        case BREADTH_FIRST_SEARCH:
            if (graphState.source && graphState.destination) {
                const { visitedNodes, parentVector }: GraphAlgOutput = bfs(graphState.source, graphState.destination, {
                    numberOfNodes: graphState.numberOfNodes,
                    nodes: graphState.nodes,
                    edges: graphState.edges,
                } as Graph);
                return {
                    visitedNodesInOrder: fromGraphNodesToPairs(visitedNodes, graphState.width),
                    shortestPath: fromGraphNodesToPairs(
                        getShortestPath(graphState.source, graphState.destination, parentVector),
                        graphState.width,
                    ),
                };
            }
            return { visitedNodesInOrder: [], shortestPath: [] };
        case DIJKSTRA_ALGORITHM:
            if (graphState.source && graphState.destination) {
                const { visitedNodes, parentVector }: GraphAlgOutput = dijkstra(
                    graphState.source,
                    graphState.destination,
                    {
                        numberOfNodes: graphState.numberOfNodes,
                        nodes: graphState.nodes,
                        edges: graphState.edges,
                    } as Graph,
                );
                return {
                    visitedNodesInOrder: fromGraphNodesToPairs(visitedNodes, graphState.width),
                    shortestPath: fromGraphNodesToPairs(
                        getShortestPath(graphState.source, graphState.destination, parentVector),
                        graphState.width,
                    ),
                };
            }
            return { visitedNodesInOrder: [], shortestPath: [] };
        case A_STAR:
            if (graphState.source && graphState.destination) {
                const { visitedNodes, parentVector }: GraphAlgOutput = aStar(
                    graphState.source,
                    graphState.destination,
                    graphState,
                );
                return {
                    visitedNodesInOrder: fromGraphNodesToPairs(visitedNodes, graphState.width),
                    shortestPath: fromGraphNodesToPairs(
                        getShortestPath(graphState.source, graphState.destination, parentVector),
                        graphState.width,
                    ),
                };
            }
            return { visitedNodesInOrder: [], shortestPath: [] };
        case BEST_FIRST_SEARCH:
            if (graphState.source && graphState.destination) {
                const { visitedNodes, parentVector }: GraphAlgOutput = bestFirstSearch(
                    graphState.source,
                    graphState.destination,
                    graphState,
                );
                return {
                    visitedNodesInOrder: fromGraphNodesToPairs(visitedNodes, graphState.width),
                    shortestPath: fromGraphNodesToPairs(
                        getShortestPath(graphState.source, graphState.destination, parentVector),
                        graphState.width,
                    ),
                };
            }
            return { visitedNodesInOrder: [], shortestPath: [] };
        default:
            return { visitedNodesInOrder: [], shortestPath: [] };
    }
};

export const checkCanPutWeight = (
    currentSelectedAlg: AlgorithmType,
    currentSelectedButton: NodeTypeButtonType,
): boolean => {
    return !(
        (currentSelectedAlg === BREADTH_FIRST_SEARCH || currentSelectedAlg === BEST_FIRST_SEARCH) &&
        currentSelectedButton === WEIGHTED_NODE_BUTTON
    );
};

export const computeDistance = (p1: Pair, p2: Pair): number => {
    return Math.sqrt((p1.row - p2.row) * (p1.row - p2.row) + (p1.col - p2.col) * (p1.col - p2.col));
};

export const algorithmDoesNoatAcceptWeights = (table: TableNodeType[][], selectedAlg: AlgorithmType): boolean => {
    const existsWeights = table.some((row: TableNodeType[]) =>
        row.some((elem: TableNodeType) => elem.nodeType === WEIGHTED_NODE),
    );
    if (!existsWeights) {
        return false;
    }
    const notSupportingWeights: GraphAlgoirhtmsType[] = [BEST_FIRST_SEARCH, BREADTH_FIRST_SEARCH];

    return !(notSupportingWeights.filter((alg: GraphAlgoirhtmsType) => alg === selectedAlg).length === 0);
};

export const getWeightFromNode = (adjId: string, nodes: GraphNode[]): number | undefined => {
    let weight = undefined;
    nodes.forEach((node: GraphNode) => {
        if (node.id === adjId) {
            weight = node.weight;
        }
    });
    return weight;
};

export const isGraphAlgorithm = (selectedAlg: AlgorithmType): boolean => {
    return graphAlgorithms.some((elem: GraphAlgoirhtmsType) => elem === selectedAlg);
};
