import { GraphNode } from '../algorithms/graph-algorithms/graph';
import { DESTINATION_NODE, SIMPLE_NODE, SOURCE_NODE, WALL_NODE, WEIGHTED_NODE } from '../components/Graph/Node';
import {
    DESTINATION_NODE_BUTTON,
    NodeTypeButtonType,
    RESTORE_NODE_BUTTON,
    SOURCE_NODE_BUTTON,
    WALL_NODE_BUTTON,
    WEIGHTED_NODE_BUTTON,
} from '../components/NodeTypeButtonGroup/NodeTypeButton';
import { TableNodeType } from '../containers/GraphContainerAlgorithms';

export type Pair = {
    row: number;
    col: number;
};

export const validCoords = (x: number, y: number, height: number, width: number): boolean => {
    return x >= 0 && y >= 0 && x < height && y < width;
};

export const generateRandomNumber = (start: number, end: number): number => {
    start = Math.ceil(start);
    end = Math.floor(end);

    return Math.floor(Math.random() * (end - start) + start);
};

export const fromIndexToPair = (index: number, width: number): Pair => {
    return {
        row: (index / width) | 0,
        col: index % width,
    };
};

export const fromPairToIndex = (pair: Pair, width: number): number => {
    return pair.row * width + pair.col;
};

const copyTableImmutable = (table: TableNodeType[][]): TableNodeType[][] => {
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
            if (
                table[x][y].nodeType === SOURCE_NODE ||
                table[x][y].nodeType === DESTINATION_NODE ||
                table[x][y].nodeType === WALL_NODE
            ) {
                return table as TableNodeType[][];
            }
            const newTable = copyTableImmutable(table);
            newTable[x][y] = { nodeType: WALL_NODE } as TableNodeType;
            return newTable;
        }
        case WEIGHTED_NODE_BUTTON: {
            if (
                table[x][y].nodeType === SOURCE_NODE ||
                table[x][y].nodeType === DESTINATION_NODE ||
                table[x][y].nodeType === WEIGHTED_NODE
            ) {
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
    x: number,
    y: number,
    width: number,
): void => {
    switch (activeNodeButton) {
        case SOURCE_NODE_BUTTON:
            if (table[x][y].nodeType === SIMPLE_NODE) {
                break;
            }

            changeSourceNodeHandler({ id: `${fromPairToIndex({ row: x, col: y }, width)}` });

            break;
        case DESTINATION_NODE_BUTTON:
            if (table[x][y].nodeType === SIMPLE_NODE) {
                break;
            }
            changeDestinationNodeHandler({ id: `${fromPairToIndex({ row: x, col: y }, width)}` });
            break;
        case WALL_NODE_BUTTON:
            if (
                table[x][y].nodeType === SOURCE_NODE ||
                table[x][y].nodeType === DESTINATION_NODE ||
                table[x][y].nodeType === WALL_NODE
            ) {
                break;
            }
            deleteNodeHandler({ id: `${fromPairToIndex({ row: x, col: y }, width)}` });
            break;
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
