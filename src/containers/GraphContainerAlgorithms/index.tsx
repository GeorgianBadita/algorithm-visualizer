import React, { Dispatch, SetStateAction } from 'react';
import Graph from '../../components/Graph';
import {
    NodeType,
    SHORTEST_PATH_NODE,
    VISITED_NODE,
    VISITED_WEIGHT_NODE,
    VISITED_WEIGHT_SHORTEST_PATH_NODE,
    WEIGHTED_NODE,
} from '../../utils/types/graph-algorithms/node-type';
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
} from '../../store/graph/actions';
import { AlgorithmVisualizerState } from '../../store/state';
import {
    algorithmDoesNoatAcceptWeights,
    copyTableImmutable,
    createErrorToast,
    getVisitedNodes,
} from '../../utils/utilsFunctions';
import NodeTypeButtonGroup from '../../components/NodeTypeButtonGroup';
import { NodeTypeButtonType, RESTORE_NODE_BUTTON } from '../../utils/types/graph-algorithms/node-type-button-type';
import { changeAlgorithm, changeRunningState, changeSpeed, clearApp } from '../../store/app/actions';
import { GraphAlgorithmResult, Pair } from '../../utils/types/graph-algorithms/algorithm-results-types';
import { useWindowSize } from '../../hooks/hooks';

const DEFAULT_HEIGHT = 22;
const DEFAULT_WIDTH = 58;

// const DEFAULT_HEIGHT = 4;
// const DEFAULT_WIDTH = 4;

const DEFAULT_FIRST_PERIOD_VISITED = 2;
const DEFAULT_INCREMENT_VISITED = 3;

const DEFAULT_FIRST_PERIOD_SHORTEST_PATH = 10;
const DEFAULT_INCREMENT_SHORTEST_PATH = 5;

const SPEED_MAPPING = {
    'Low Speed': 10,
    'Medium Speed': 4,
    'High Speed': 0.75,
};

export type TableNodeType = {
    nodeType: NodeType;
    weight?: number;
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
    // const [height, setHeight] = React.useState(DEFAULT_HEIGHT);
    // const [width, setWidth] = React.useState(DEFAULT_WIDTH);
    const [width, height] = useWindowSize();
    const [activeNodeType, setActiveNodeType] = React.useState(RESTORE_NODE_BUTTON as NodeTypeButtonType);
    const [stillRunning, setStillRunning] = React.useState(false);
    const tableRef = React.useRef(props.table);
    tableRef.current = props.table;
    console.log(width);
    console.log(height);
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

        //Handle the case where there is no path to the destination node
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

    React.useEffect(() => {
        props.initGraph(height, width);
    }, [height, width]);

    React.useEffect(() => {
        if (props.runningAlg && !stillRunning) {
            setStillRunning(true);
            handleAlgorithmStartsRunning();
        }
    }, [props.runningAlg, stillRunning]);

    const clearApp = () => {
        props.clearAppState();
        props.clearGraph();
    };

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
