import React, { Dispatch, SetStateAction } from 'react';
import Graph from '../../components/Graph';
import {
    SHORTEST_PATH_NODE,
    VISITED_NODE,
    VISITED_WEIGHT_NODE,
    VISITED_WEIGHT_SHORTEST_PATH_NODE,
    WEIGHTED_NODE,
} from '../../utils/types/graph-types/node-type';
import classes from './GraphContainerAlgorithms.module.css';
import { connect, ConnectedProps } from 'react-redux';
import {
    addNode,
    addWeightedNode,
    changeDestinationNode,
    changeSourceNode,
    changeTable,
    clearGraph,
    deleteNode,
    initGraph,
    resetGraphForNewAlgorithm,
} from '../../store/graph/actions';
import { AlgorithmVisualizerState } from '../../store/state';
import {
    algorithmDoesNoatAcceptWeights,
    copyTableImmutable,
    getVisitedNodes,
    isGraphAlgorithm,
} from '../../utils/graph-utils-functions';
import NodeTypeButtonGroup from '../../components/GraphOptionsButtonGroup';
import { NodeTypeButtonType, RESTORE_NODE_BUTTON } from '../../utils/types/graph-types/node-type-button-type';
import { changeAlgorithm, changeRunningState, changeSpeed, clearApp, setUiActions } from '../../store/app/actions';
import { GraphAlgorithmResult, Pair } from '../../utils/types/graph-types/graph-results-types';
import { useWindowSize, useWindowSizeDivided } from '../../hooks/hooks';
import { createErrorToast } from '../../utils/app-utils-functions';

const DEFAULT_FIRST_PERIOD_VISITED = 2;
const DEFAULT_INCREMENT_VISITED = 3;

const DEFAULT_FIRST_PERIOD_SHORTEST_PATH = 10;
const DEFAULT_INCREMENT_SHORTEST_PATH = 5;

const DEFAULT_SQUARE_SIZE = 30;

const HEIGHT_THRESHOLD = 910;

const SPEED_MAPPING = {
    'Low Speed': 10,
    'Medium Speed': 4,
    'High Speed': 0.75,
};

const mapDispatchToProps = {
    initializeGraph: initGraph,
    delNode: deleteNode,
    insertNode: addNode,
    addWeighted: addWeightedNode,
    changeSorce: changeSourceNode,
    changeDestination: changeDestinationNode,
    setTable: changeTable,
    setRunning: changeRunningState,
    clearAppState: clearApp,
    clearGraphState: clearGraph,
    setSelectedAlg: changeAlgorithm,
    setSpeed: changeSpeed,
    resetGraphForAlg: resetGraphForNewAlgorithm,
    setTimeouts: setUiActions,
};

const mapStateToProps = (state: AlgorithmVisualizerState) => ({
    source: state.graph.source,
    destination: state.graph.destination,
    selectedAlg: state.app.selectedAlg,
    graphState: state.graph,
    table: state.graph.table,
    running: state.app.running,
    timeOuts: state.app.uiActions,
    speed: state.app.speed,
});

const connector = connect(mapStateToProps, mapDispatchToProps);
type GraphContainerAlgorithmsProps = ConnectedProps<typeof connector>;

const GraphContainerAlgorithms = (props: GraphContainerAlgorithmsProps): JSX.Element => {
    const {
        running,
        table,
        setTable,
        setRunning,
        selectedAlg,
        setTimeouts,
        graphState,
        initializeGraph,
        clearAppState,
        clearGraphState,
        setSelectedAlg,
        setSpeed,
        resetGraphForAlg,
        delNode,
        insertNode,
        addWeighted,
        changeDestination,
        changeSorce,
        speed,
    } = props;
    const [width, height] = useWindowSizeDivided(DEFAULT_SQUARE_SIZE, DEFAULT_SQUARE_SIZE);
    const [, realHeight] = useWindowSize();
    const [activeNodeType, setActiveNodeType] = React.useState(RESTORE_NODE_BUTTON as NodeTypeButtonType);
    const [stillRunning, setStillRunning] = React.useState(false);
    const tableRef = React.useRef(props.table);
    const timeOutsRef = React.useRef(props.timeOuts);
    tableRef.current = props.table;
    timeOutsRef.current = props.timeOuts;

    const speedMultiplier = SPEED_MAPPING[speed];

    const handleShowShortestPath = React.useCallback(
        (shortestPath: Pair[]) => {
            let currentDelay = DEFAULT_FIRST_PERIOD_SHORTEST_PATH;
            const timeOuts: ReturnType<typeof setTimeout>[] = [];

            shortestPath.forEach((pair: Pair) => {
                timeOuts.push(
                    setTimeout(() => {
                        const { row, col, weight } = pair;
                        const newTable = copyTableImmutable(tableRef.current);
                        if (newTable[row][col].nodeType === VISITED_WEIGHT_NODE) {
                            newTable[row][col] = { nodeType: VISITED_WEIGHT_SHORTEST_PATH_NODE, weight: weight };
                        } else {
                            newTable[row][col] = { nodeType: SHORTEST_PATH_NODE, weight: weight };
                        }

                        setTable(newTable);
                    }, currentDelay * speedMultiplier),
                );
                currentDelay += DEFAULT_INCREMENT_SHORTEST_PATH;
            });
            timeOuts.push(
                setTimeout(() => {
                    setRunning(false);
                    setStillRunning(false);
                }, currentDelay * speedMultiplier),
            );

            return timeOuts;
        },
        [speedMultiplier, setRunning, setTable],
    );

    const handleAlgorithmStartsRunning = React.useCallback((): void => {
        if (algorithmDoesNoatAcceptWeights(table, selectedAlg)) {
            createErrorToast(`You cannot run ${selectedAlg} with weights`);
            setStillRunning(false);
            setRunning(false);
            return;
        }

        const { visitedNodesInOrder, shortestPath }: GraphAlgorithmResult = getVisitedNodes(selectedAlg, graphState);

        const timeOuts: ReturnType<typeof setTimeout>[] = [];

        let currentSetTimeOutDelay = DEFAULT_FIRST_PERIOD_VISITED;
        visitedNodesInOrder.forEach((pair: Pair, index: number) => {
            timeOuts.push(
                setTimeout(() => {
                    const { row, col, weight } = pair;
                    const newTable = copyTableImmutable(tableRef.current);
                    if (newTable[row][col].nodeType === WEIGHTED_NODE) {
                        newTable[row][col] = { nodeType: VISITED_WEIGHT_NODE, weight: weight };
                    } else {
                        newTable[row][col] = { nodeType: VISITED_NODE, weight: weight };
                    }

                    setTable(newTable);
                    if (index === visitedNodesInOrder.length - 1) {
                        timeOuts.concat(handleShowShortestPath(shortestPath));
                    }
                }, currentSetTimeOutDelay * speedMultiplier),
            );
            currentSetTimeOutDelay += DEFAULT_INCREMENT_VISITED;
        });
        setTimeouts(timeOuts);
    }, [setTimeouts, setTable, speedMultiplier, table, selectedAlg, setRunning, handleShowShortestPath, graphState]);

    const clearApp = React.useCallback(() => {
        clearAppState();
        clearGraphState();
    }, [clearAppState, clearGraphState]);

    React.useEffect(() => {
        let heightCopy = height;
        const widthCopy = width;
        if (realHeight < HEIGHT_THRESHOLD) {
            heightCopy = (0.9 * heightCopy) | 0;
        }
        initializeGraph(heightCopy, widthCopy);
    }, [height, width, realHeight, initializeGraph]);

    React.useEffect(() => {
        if (running && !stillRunning && isGraphAlgorithm(selectedAlg)) {
            setStillRunning(true);
            handleAlgorithmStartsRunning();
        }
        if (!running && timeOutsRef.current.length > 0) {
            timeOutsRef.current.forEach((timeout) => clearTimeout(timeout));
            setStillRunning(false);
            setTimeouts([]);
        }
    }, [running, stillRunning, selectedAlg, handleAlgorithmStartsRunning, setTimeouts]);

    return (
        <>
            <NodeTypeButtonGroup
                selectedAlg={selectedAlg}
                setSelectedAlg={setSelectedAlg}
                running={running}
                clearApp={clearAppState}
                clearButton={clearApp}
                changeAppRunningState={setRunning}
                activeNodeTypeButton={activeNodeType}
                setActiveNodeTypeButton={setActiveNodeType as Dispatch<SetStateAction<NodeTypeButtonType>>}
                setSpeed={setSpeed}
                resetGraphForAlg={resetGraphForAlg}
            />
            <div className={classes.graphContainerAlgorithms}>
                <Graph
                    width={width}
                    height={height}
                    table={table}
                    activeNodeTypeButton={activeNodeType}
                    setActiveNodeTypeButton={setActiveNodeType as Dispatch<SetStateAction<NodeTypeButtonType>>}
                    selectedAlg={selectedAlg}
                    setGraph={setTable}
                    changeSourceNode={changeSorce}
                    changeDestinationNode={changeDestination}
                    deleteNode={delNode}
                    addNode={insertNode}
                    addWeightedNode={addWeighted}
                    running={running}
                    graphState={graphState}
                />
            </div>
        </>
    );
};

export default React.memo(connector(GraphContainerAlgorithms));
