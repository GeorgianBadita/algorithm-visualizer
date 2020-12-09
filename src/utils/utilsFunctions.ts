import { bfs } from '../algorithms/graph-algorithms/bfs';
import { Graph, GraphNode, ParentVectorType } from '../algorithms/graph-algorithms/graph';
import {
    A_STAR,
    BEST_FIRST_SEARCH,
    BREADTH_FIRST_SEARCH,
    DIJKSTRA_ALGORITHM,
    GraphAlgoirhtmsType,
    NO_ALGORITHM,
} from './types/graph-algorithms/algorithm-types';
import {
    DESTINATION_NODE,
    SIMPLE_NODE,
    SOURCE_NODE,
    WALL_NODE,
    WEIGHTED_NODE,
} from '../utils/types/graph-algorithms/node-type';
import {
    DESTINATION_NODE_BUTTON,
    NodeTypeButtonType,
    RESTORE_NODE_BUTTON,
    SOURCE_NODE_BUTTON,
    WALL_NODE_BUTTON,
    WEIGHTED_NODE_BUTTON,
} from './types/graph-algorithms/node-type-button-type';
import { TableNodeType } from '../containers/GraphContainerAlgorithms';
import { GraphState } from '../store/graph/state';
import { GraphAlgorithmResult, GraphAlgOutput, Pair } from './types/graph-algorithms/algorithm-results-types';
import { dijkstra } from '../algorithms/graph-algorithms/dijkstra';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { aStar } from '../algorithms/graph-algorithms/a_star';
import { bestFirstSearch } from '../algorithms/graph-algorithms/best-first-search';
import { HIGH_SPEED, LOW_SPEED, MEDIUM_SPEED, SpeedType } from './types/graph-algorithms/alg-speed-type';

export const validCoords = (x: number, y: number, height: number, width: number): boolean => {
    return x >= 0 && y >= 0 && x < height && y < width;
};

export const generateRandomNumber = (start: number, end: number): number => {
    start = Math.ceil(start);
    end = Math.floor(end);

    return Math.floor(Math.random() * (end - start) + start);
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
                table[x][y].nodeType === SIMPLE_NODE
            ) {
                return table as TableNodeType[][];
            }

            const newTable = copyTableImmutable(table);
            newTable[x][y].nodeType = SIMPLE_NODE;
            return newTable;
        }
        case SOURCE_NODE_BUTTON: {
            if (table[x][y].nodeType !== SIMPLE_NODE) {
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
            if (table[x][y].nodeType !== SIMPLE_NODE) {
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

            newTable[x][y].nodeType = DESTINATION_NODE;
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

            changeSourceNodeHandler({ id: `${fromPairToIndex({ row: x, col: y }, width)}` });

            break;
        case DESTINATION_NODE_BUTTON:
            if (table[x][y].nodeType !== SIMPLE_NODE) {
                break;
            }
            changeDestinationNodeHandler({ id: `${fromPairToIndex({ row: x, col: y }, width)}` });
            break;
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
                table[x][y].nodeType === SIMPLE_NODE
            ) {
                break;
            }
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
    while (currentNode.id !== source.id) {
        result.push({ ...currentNode });
        currentNode = parentVector[currentNode.id];
    }
    result.shift();
    return result.reverse();
};

export const getVisitedNodes = (algType: GraphAlgoirhtmsType, graphState: GraphState): GraphAlgorithmResult => {
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
    currentSelectedAlg: GraphAlgoirhtmsType,
    currentSelectedButton: NodeTypeButtonType,
): boolean => {
    return !(
        (currentSelectedAlg === BREADTH_FIRST_SEARCH || currentSelectedAlg === BEST_FIRST_SEARCH) &&
        currentSelectedButton === WEIGHTED_NODE_BUTTON
    );
};

export const createErrorToast = (err: string): void => {
    toast.error(err, {
        position: 'bottom-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });
};

export const computeDistance = (p1: Pair, p2: Pair): number => {
    return Math.sqrt((p1.row - p2.row) * (p1.row - p2.row) + (p1.col - p2.col) * (p1.col - p2.col));
};

export const algorithmDoesNoatAcceptWeights = (table: TableNodeType[][], selectedAlg: GraphAlgoirhtmsType): boolean => {
    const existsWeights = table.some((row: TableNodeType[]) =>
        row.some((elem: TableNodeType) => elem.nodeType === WEIGHTED_NODE),
    );
    if (!existsWeights) {
        return false;
    }
    const notSupportingWeights: GraphAlgoirhtmsType[] = [BEST_FIRST_SEARCH, BREADTH_FIRST_SEARCH];

    return !(notSupportingWeights.filter((alg: GraphAlgoirhtmsType) => alg === selectedAlg).length === 0);
};

export const speedStrTpSpeed = (newSpeed: string): SpeedType => {
    switch (newSpeed) {
        case 'Low Speed':
            return LOW_SPEED;
        case 'Medium Speed':
            return MEDIUM_SPEED;
        case 'High Speed':
            return HIGH_SPEED;
        default:
            return MEDIUM_SPEED;
    }
};
