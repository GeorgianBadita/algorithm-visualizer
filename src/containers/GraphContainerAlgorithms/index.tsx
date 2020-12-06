import React, { Dispatch, SetStateAction } from 'react';
import Graph from '../../components/Graph';
import { DESTINATION_NODE, NodeType, SIMPLE_NODE, SOURCE_NODE } from '../../components/Graph/Node';
import classes from './GraphContainerAlgorithms.module.css';
import { connect, ConnectedProps } from 'react-redux';
import { addNode, changeDestinationNode, changeSourceNode, deleteNode, initGraph } from '../../store/graph/actions';
import { AlgorithmVisualizerState } from '../../store/state';
import { fromIndexToPair } from '../../utils/utilsFunctions';
import NodeTypeButtonGroup from '../../components/NodeTypeButtonGroup';
import { NodeTypeButtonType, RESTORE_NODE_BUTTON } from '../../components/NodeTypeButtonGroup/NodeTypeButton';

const DEFAULT_HEIGHT = 22;
const DEFAULT_WIDTH = 58;

// const DEFAULT_HEIGHT = 3;
// const DEFAULT_WIDTH = 3;

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
    changeSorce: changeSourceNode,
    changeDestination: changeDestinationNode,
};

const mapStateToProps = (state: AlgorithmVisualizerState) => ({
    source: state.graph.source,
    destination: state.graph.destination,
});

const connector = connect(mapStateToProps, mapDispatchToProps);
type GraphContainerAlgorithmsProps = ConnectedProps<typeof connector>;

const GraphContainerAlgorithms = (props: GraphContainerAlgorithmsProps): JSX.Element => {
    const [height, setHeight] = React.useState(DEFAULT_HEIGHT);
    const [width, setWidth] = React.useState(DEFAULT_WIDTH);
    const [table, setTable] = React.useState([[]] as TableNodeType[][]);
    const [tableInitialized, setTableInitialized] = React.useState(false);
    const [activeNodeType, setActiveNodeType] = React.useState(RESTORE_NODE_BUTTON as NodeTypeButtonType);

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

    React.useEffect(() => {
        const newTable = initData(height, width);
        props.initGraph(height, width);
        setTable(newTable);
    }, [height, width]);

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
                />
            </div>
        </>
    );
};

export default connector(GraphContainerAlgorithms);
