import React, { Dispatch, SetStateAction } from 'react';

import Node from './Node/index';
import classes from './Graph.module.css';

import {
    checkCanPutWeight,
    copyTableImmutable,
    getNewGrid,
    getVisitedNodes,
    reduxGraphUpdateDispatchHelper,
    wasAlgorithmRunning,
} from '../../utils/graph-utils-functions';
import { GraphNode } from '../../algorithms/graph-algorithms/graph';
import { GraphActionTypes } from '../../store/graph/types';
import {
    DESTINATION_NODE_BUTTON,
    NodeTypeButtonType,
    SOURCE_NODE_BUTTON,
} from '../../utils/types/graph-types/node-type-button-type';
import { toast } from 'react-toastify';
import { AlgorithmType } from '../../utils/types/app-types/algorithm-classes-types';
import { TableNodeType } from '../../utils/types/graph-types/table-node-type';
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
import { GraphAlgorithmResult, Pair } from '../../utils/types/graph-types/graph-results-types';
import { GraphState } from '../../store/graph/state';

const DEFAULT_WEIGHT_VALUE = 10;

type GraphProps = {
    height: number;
    width: number;
    table: TableNodeType[][];
    activeNodeTypeButton: NodeTypeButtonType;
    selectedAlg: AlgorithmType;
    setGraph: (value: TableNodeType[][]) => void;
    running: boolean;
    changeSourceNode: (newSoruce: GraphNode) => GraphActionTypes;
    changeDestinationNode: (newDest: GraphNode) => GraphActionTypes;
    deleteNode: (node: GraphNode) => GraphActionTypes;
    addNode: (node: GraphNode, table: TableNodeType[][]) => GraphActionTypes;
    addWeightedNode: (node: GraphNode, table: TableNodeType[][]) => GraphActionTypes;
    setActiveNodeTypeButton: Dispatch<SetStateAction<NodeTypeButtonType>>;
    graphState: GraphState;
};

const Graph = (props: GraphProps): JSX.Element => {
    const [isClicked, setIsClicked] = React.useState(false);
    const [lastActiveButton, setLastActiveButton] = React.useState(props.activeNodeTypeButton);
    const tableRef = React.useRef(props.table);
    tableRef.current = props.table;

    const handleRedrawOnDestinationMove = (): void => {
        const { visitedNodesInOrder, shortestPath }: GraphAlgorithmResult = getVisitedNodes(
            props.selectedAlg,
            props.graphState,
        );
        const newTable = copyTableImmutable(tableRef.current).map((row: TableNodeType[]) =>
            row.map((elem: TableNodeType) => {
                if (elem.nodeType === VISITED_NODE || elem.nodeType === SHORTEST_PATH_NODE) {
                    return { nodeType: SIMPLE_NODE } as TableNodeType;
                }
                if (elem.nodeType === VISITED_WEIGHT_NODE) {
                    return { nodeType: WEIGHTED_NODE, weight: DEFAULT_WEIGHT_VALUE } as TableNodeType;
                }
                return elem;
            }),
        );

        visitedNodesInOrder.forEach((pair: Pair) => {
            const { row, col, weight } = pair;
            if (newTable[row][col].nodeType === WEIGHTED_NODE) {
                newTable[row][col] = { nodeType: VISITED_WEIGHT_NODE, weight: weight };
            } else if (newTable[row][col].nodeType !== DESTINATION_NODE) {
                newTable[row][col] = { nodeType: VISITED_NODE, weight: weight };
            }
        });

        shortestPath.forEach((pair: Pair) => {
            const { row, col, weight } = pair;
            if (newTable[row][col].nodeType === VISITED_WEIGHT_NODE) {
                newTable[row][col] = { nodeType: VISITED_WEIGHT_SHORTEST_PATH_NODE, weight: weight };
            } else if (newTable[row][col].nodeType !== DESTINATION_NODE) {
                newTable[row][col] = { nodeType: SHORTEST_PATH_NODE, weight: weight };
            }
        });
        props.setGraph(newTable);
    };

    const handleOnMouseEnter = (x: number, y: number): void => {
        if (!isClicked) return;
        if (!checkCanPutWeight(props.selectedAlg, props.activeNodeTypeButton)) {
            toast(`You cannot use weights with ${props.selectedAlg}`);
            return;
        }
        if (props.running) {
            toast(`You cannot modify graph while algorithm is running`);
            return;
        }

        props.setGraph(getNewGrid(tableRef.current, props.activeNodeTypeButton, x, y));
        reduxGraphUpdateDispatchHelper(
            tableRef.current,
            props.activeNodeTypeButton,
            props.changeSourceNode,
            props.changeDestinationNode,
            props.deleteNode,
            props.addNode,
            props.addWeightedNode,
            x,
            y,
            props.width,
            DEFAULT_WEIGHT_VALUE,
        );

        //TODO: THIS IS AN EXPERIMENTAL FEATURE
        if (
            window.experimental &&
            window.experimental === true &&
            props.activeNodeTypeButton === DESTINATION_NODE_BUTTON &&
            wasAlgorithmRunning(tableRef.current)
        ) {
            setTimeout(() => handleRedrawOnDestinationMove(), 300);
        }
    };

    const handleOnMouseUp = () => {
        if (
            props.activeNodeTypeButton === SOURCE_NODE_BUTTON ||
            props.activeNodeTypeButton === DESTINATION_NODE_BUTTON
        ) {
            props.setActiveNodeTypeButton(lastActiveButton);
        }
        setIsClicked(false);
    };

    const handleOnMouseDown = (x: number, y: number) => {
        if (!checkCanPutWeight(props.selectedAlg, props.activeNodeTypeButton)) {
            toast(`You cannot use weights with ${props.selectedAlg}`);
            return;
        }
        if (props.running) {
            toast(`You cannot modify graph while algorithm is running`);
            return;
        }

        //dragging source node
        if (tableRef.current[x][y].nodeType === SOURCE_NODE) {
            setLastActiveButton(props.activeNodeTypeButton);
            props.setActiveNodeTypeButton(SOURCE_NODE_BUTTON);
        } else if (tableRef.current[x][y].nodeType === DESTINATION_NODE) {
            //dragging destination node
            setLastActiveButton(props.activeNodeTypeButton);
            props.setActiveNodeTypeButton(DESTINATION_NODE_BUTTON);
        }

        props.setGraph(getNewGrid(tableRef.current, props.activeNodeTypeButton, x, y));
        reduxGraphUpdateDispatchHelper(
            tableRef.current,
            props.activeNodeTypeButton,
            props.changeSourceNode,
            props.changeDestinationNode,
            props.deleteNode,
            props.addNode,
            props.addWeightedNode,
            x,
            y,
            props.width,
            DEFAULT_WEIGHT_VALUE,
        );

        //TODO: THIS IS AN EXPERIMENTAL FEATURE
        if (
            window.experimental &&
            window.experimental === true &&
            props.activeNodeTypeButton === DESTINATION_NODE_BUTTON &&
            wasAlgorithmRunning(tableRef.current)
        ) {
            setTimeout(() => handleRedrawOnDestinationMove(), 300);
        }
        setIsClicked(true);
    };

    const getGraphData = () => {
        return props.table.map((row, x) => (
            <tr key={x}>
                {row.map((tableNode, y) => (
                    <td key={`${x} ${y}`}>
                        <Node
                            nodeType={tableNode.nodeType}
                            row={x}
                            col={y}
                            onMouseDown={handleOnMouseDown}
                            onMouseEnter={handleOnMouseEnter}
                            weight={tableNode.weight}
                        ></Node>
                    </td>
                ))}
            </tr>
        ));
    };

    return (
        <table className={classes.graph} cellSpacing={0} onMouseUp={() => handleOnMouseUp()}>
            <tbody>{getGraphData()}</tbody>
        </table>
    );
};

export default React.memo(Graph);
