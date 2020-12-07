import React, { Dispatch, SetStateAction } from 'react';
import Graph from '../../components/Graph';
import {
    DESTINATION_NODE,
    NodeType,
    SHORTEST_PATH_NODE,
    SIMPLE_NODE,
    SOURCE_NODE,
    VISITED_NODE,
} from '../../utils/types/graph-algorithms/node-type';
import classes from './GraphContainerAlgorithms.module.css';
import { connect, ConnectedProps } from 'react-redux';
import {
    addNode,
    addWeightedNode,
    changeDestinationNode,
    changeSourceNode,
    deleteNode,
    initGraph,
} from '../../store/graph/actions';
import { AlgorithmVisualizerState } from '../../store/state';
import { copyTableImmutable, fromIndexToPair, getVisitedNodes } from '../../utils/utilsFunctions';
import NodeTypeButtonGroup from '../../components/NodeTypeButtonGroup';
import { NodeTypeButtonType, RESTORE_NODE_BUTTON } from '../../utils/types/graph-algorithms/node-type-button-type';
import { changeRunningState } from '../../store/app/actions';
import { GraphAlgorithmResult, Pair } from '../../utils/types/graph-algorithms/algorithm-results-types';

const DEFAULT_HEIGHT = 22;
const DEFAULT_WIDTH = 58;

// const DEFAULT_HEIGHT = 4;
// const DEFAULT_WIDTH = 4;

const DEFAULT_FIRST_PERIOD_VISITED = 2;
const DEFAULT_INCREMENT_VISITED = 3;

const DEFAULT_FIRST_PERIOD_SHORTEST_PATH = 10;
const DEFAULT_INCREMENT_SHORTEST_PATH = 5;

export type TableNodeType = {
    nodeType: NodeType;
    weight?: number;
};

const initData = (height: number, width: number): TableNodeType[][] => {
    return Array(height)
        .fill(null)
        .map(() => Array(width).fill({ nodeType: SIMPLE_NODE }));
};

const mapDispatchToProps = {
    initGraph: initGraph,
    deleteNode: deleteNode,
    addNode: addNode,
    addWeightedNode: addWeightedNode,
    changeSorce: changeSourceNode,
    changeDestination: changeDestinationNode,
    changeRunningState: changeRunningState,
};

const mapStateToProps = (state: AlgorithmVisualizerState) => ({
    source: state.graph.source,
    destination: state.graph.destination,
    runningAlg: state.app.running,
    selectedAlg: state.app.selectedAlg,
    graphState: state.graph,
});

const connector = connect(mapStateToProps, mapDispatchToProps);
type GraphContainerAlgorithmsProps = ConnectedProps<typeof connector>;

const GraphContainerAlgorithms = (props: GraphContainerAlgorithmsProps): JSX.Element => {
    const [height, setHeight] = React.useState(DEFAULT_HEIGHT);
    const [width, setWidth] = React.useState(DEFAULT_WIDTH);
    const [table, setTable] = React.useState([[]] as TableNodeType[][]);
    const [tableInitialized, setTableInitialized] = React.useState(false);
    const [activeNodeType, setActiveNodeType] = React.useState(RESTORE_NODE_BUTTON as NodeTypeButtonType);
    const tableRef = React.useRef(table);
    tableRef.current = table;

    const initSourceDest = () => {
        if (props.source?.id && props.destination?.id) {
            const sourceIndex = parseInt(props.source.id, 10);
            const destinationIdex = parseInt(props.destination.id, 10);

            const sourcePair = fromIndexToPair(sourceIndex, width);
            const destinationPair = fromIndexToPair(destinationIdex, width);

            const newTable = [...table];
            newTable[sourcePair.row][sourcePair.col] = { nodeType: SOURCE_NODE } as TableNodeType;
            newTable[destinationPair.row][destinationPair.col] = { nodeType: DESTINATION_NODE } as TableNodeType;
            setTable(newTable);
            setTableInitialized(true);
        }
    };

    const handleShowShortestPath = (shortestPath: Pair[]) => {
        let currentDelay = DEFAULT_FIRST_PERIOD_SHORTEST_PATH;
        shortestPath.forEach((pair: Pair) => {
            setTimeout(() => {
                const { row, col } = pair;
                const newTable = copyTableImmutable(tableRef.current);
                newTable[row][col] = { nodeType: SHORTEST_PATH_NODE };
                setTable(newTable);
            }, currentDelay);
            currentDelay += DEFAULT_INCREMENT_SHORTEST_PATH;
        });
    };

    const handleAlgorithmStartsRunning = () => {
        const { visitedNodesInOrder, shortestPath }: GraphAlgorithmResult = getVisitedNodes(
            props.selectedAlg,
            props.graphState,
        );
        let currentSetTimeOutDelay = DEFAULT_FIRST_PERIOD_VISITED;
        visitedNodesInOrder.forEach((pair: Pair, index: number) => {
            setTimeout(() => {
                const { row, col } = pair;
                const newTable = copyTableImmutable(tableRef.current);
                newTable[row][col] = { nodeType: VISITED_NODE };
                setTable(newTable);

                if (index == visitedNodesInOrder.length - 1) {
                    handleShowShortestPath(shortestPath);
                }
            }, currentSetTimeOutDelay);
            currentSetTimeOutDelay += DEFAULT_INCREMENT_VISITED;
        });
    };

    React.useEffect(() => {
        const newTable = initData(height, width);
        props.initGraph(height, width);
        setTable(newTable);
    }, [height, width]);

    React.useEffect(() => {
        if (props.runningAlg) {
            handleAlgorithmStartsRunning();
            props.changeRunningState(false);
        }
    }, [props.runningAlg]);

    if (!tableInitialized) {
        initSourceDest();
    }

    return (
        <>
            <NodeTypeButtonGroup
                activeNodeTypeButton={activeNodeType}
                setActiveNodeTypeButton={setActiveNodeType as Dispatch<SetStateAction<NodeTypeButtonType>>}
            />
            <div className={classes.graphContainerAlgorithms}>
                <Graph
                    width={width}
                    height={height}
                    table={table}
                    activeNodeTypeButton={activeNodeType}
                    setGraph={setTable}
                    changeSourceNode={props.changeSorce}
                    changeDestinationNode={props.changeDestination}
                    deleteNode={props.deleteNode}
                    addNode={props.addNode}
                    addWeightedNode={props.addWeightedNode}
                />
            </div>
        </>
    );
};

export default React.memo(connector(GraphContainerAlgorithms));
