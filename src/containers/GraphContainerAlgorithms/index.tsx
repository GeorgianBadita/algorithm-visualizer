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
import { changeAlgorithm, changeRunningState, changeSpeed, clearApp } from '../../store/app/actions';
import { GraphAlgorithmResult, Pair } from '../../utils/types/graph-types/graph-results-types';
import { useWindowSize, useWindowSizeDivided } from '../../hooks/hooks';
import { createErrorToast } from '../../utils/app-utils-functions';

const DEFAULT_FIRST_PERIOD_VISITED = 2;
const DEFAULT_INCREMENT_VISITED = 3;

const DEFAULT_FIRST_PERIOD_SHORTEST_PATH = 10;
const DEFAULT_INCREMENT_SHORTEST_PATH = 5;

const DEFAULT_SQUARE_SIZE = 30;

const HEIGHT_THRESHOLD = 850;

const SPEED_MAPPING = {
    'Low Speed': 10,
    'Medium Speed': 4,
    'High Speed': 0.75,
};

const mapDispatchToProps = {
    initGraph: initGraph,
    deleteNode: deleteNode,
    addNode: addNode,
    addWeightedNode: addWeightedNode,
    changeSorce: changeSourceNode,
    changeDestination: changeDestinationNode,
    changeRunningState: changeRunningState,
    setTable: changeTable,
    setRunning: changeRunningState,
    clearAppState: clearApp,
    clearGraph: clearGraph,
    setSelectedAlg: changeAlgorithm,
    setSpeed: changeSpeed,
    resetGraphForAlg: resetGraphForNewAlgorithm,
};

const mapStateToProps = (state: AlgorithmVisualizerState) => ({
    source: state.graph.source,
    destination: state.graph.destination,
    runningAlg: state.app.running,
    selectedAlg: state.app.selectedAlg,
    graphState: state.graph,
    table: state.graph.table,
    speed: state.app.speed,
    running: state.app.running,
});

const connector = connect(mapStateToProps, mapDispatchToProps);
type GraphContainerAlgorithmsProps = ConnectedProps<typeof connector>;

const GraphContainerAlgorithms = (props: GraphContainerAlgorithmsProps): JSX.Element => {
    const [width, height] = useWindowSizeDivided(DEFAULT_SQUARE_SIZE, DEFAULT_SQUARE_SIZE);
    const [_, realHeight] = useWindowSize();
    const [activeNodeType, setActiveNodeType] = React.useState(RESTORE_NODE_BUTTON as NodeTypeButtonType);
    const [stillRunning, setStillRunning] = React.useState(false);
    const tableRef = React.useRef(props.table);
    tableRef.current = props.table;

    const speedMultiplier = SPEED_MAPPING[props.speed];

    const handleShowShortestPath = (shortestPath: Pair[]) => {
        let currentDelay = DEFAULT_FIRST_PERIOD_SHORTEST_PATH;
        shortestPath.forEach((pair: Pair) => {
            setTimeout(() => {
                const { row, col, weight } = pair;
                const newTable = copyTableImmutable(tableRef.current);
                if (newTable[row][col].nodeType === VISITED_WEIGHT_NODE) {
                    newTable[row][col] = { nodeType: VISITED_WEIGHT_SHORTEST_PATH_NODE, weight: weight };
                } else {
                    newTable[row][col] = { nodeType: SHORTEST_PATH_NODE, weight: weight };
                }

                props.setTable(newTable);
            }, currentDelay * speedMultiplier);
            currentDelay += DEFAULT_INCREMENT_SHORTEST_PATH;
        });
        setTimeout(() => {
            props.changeRunningState(false);
            setStillRunning(false);
        }, currentDelay * speedMultiplier);
    };

    const handleAlgorithmStartsRunning = () => {
        if (algorithmDoesNoatAcceptWeights(props.table, props.selectedAlg)) {
            createErrorToast(`You cannot run ${props.selectedAlg} with weights`);
            setStillRunning(false);
            props.setRunning(false);
            return;
        }

        const { visitedNodesInOrder, shortestPath }: GraphAlgorithmResult = getVisitedNodes(
            props.selectedAlg,
            props.graphState,
        );
        let currentSetTimeOutDelay = DEFAULT_FIRST_PERIOD_VISITED;
        visitedNodesInOrder.forEach((pair: Pair, index: number) => {
            setTimeout(() => {
                const { row, col, weight } = pair;
                const newTable = copyTableImmutable(tableRef.current);
                if (newTable[row][col].nodeType === WEIGHTED_NODE) {
                    newTable[row][col] = { nodeType: VISITED_WEIGHT_NODE, weight: weight };
                } else {
                    newTable[row][col] = { nodeType: VISITED_NODE, weight: weight };
                }

                props.setTable(newTable);
                if (index === visitedNodesInOrder.length - 1) {
                    handleShowShortestPath(shortestPath);
                }
            }, currentSetTimeOutDelay * speedMultiplier);
            currentSetTimeOutDelay += DEFAULT_INCREMENT_VISITED;
        });
    };
    const clearApp = () => {
        props.clearAppState();
        props.clearGraph();
    };

    React.useEffect(() => {
        if (props.running || stillRunning) {
            clearApp();
        }
        let heightCopy = height;
        const widthCopy = width;
        if (realHeight < HEIGHT_THRESHOLD) {
            heightCopy = (0.9 * heightCopy) | 0;
        }
        props.initGraph(heightCopy, widthCopy);
    }, [height, width, realHeight]);

    React.useEffect(() => {
        if (props.runningAlg && !stillRunning && isGraphAlgorithm(props.selectedAlg)) {
            setStillRunning(true);
            handleAlgorithmStartsRunning();
        }
    }, [props.runningAlg, stillRunning, props.selectedAlg]);

    return (
        <>
            <NodeTypeButtonGroup
                selectedAlg={props.selectedAlg}
                setSelectedAlg={props.setSelectedAlg}
                running={props.running}
                clearApp={clearApp}
                changeAppRunningState={props.changeRunningState}
                activeNodeTypeButton={activeNodeType}
                setActiveNodeTypeButton={setActiveNodeType as Dispatch<SetStateAction<NodeTypeButtonType>>}
                setSpeed={props.setSpeed}
                resetGraphForAlg={props.resetGraphForAlg}
            />
            <div className={classes.graphContainerAlgorithms}>
                <Graph
                    width={width}
                    height={height}
                    table={props.table}
                    activeNodeTypeButton={activeNodeType}
                    selectedAlg={props.selectedAlg}
                    setGraph={props.setTable}
                    changeSourceNode={props.changeSorce}
                    changeDestinationNode={props.changeDestination}
                    deleteNode={props.deleteNode}
                    addNode={props.addNode}
                    addWeightedNode={props.addWeightedNode}
                    running={props.runningAlg}
                />
            </div>
        </>
    );
};

export default React.memo(connector(GraphContainerAlgorithms));
