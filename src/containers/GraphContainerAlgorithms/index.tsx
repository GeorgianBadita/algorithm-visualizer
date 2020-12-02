import React from 'react';
import Graph from '../../components/Graph';
import { DESTINATION_NODE, NodeType, SIMPLE_NODE, SOURCE_NODE } from '../../components/Graph/Node';
import classes from './GraphContainerAlgorithms.module.css';
import { connect, ConnectedProps } from 'react-redux';
import { deleteNode, initGraph } from '../../store/graph/actions';
import { AlgorithmVisualizerState } from '../../store/state';
import { fromIndexToPair } from '../../utils/utilsFunctions';

const DEFAULT_HEIGHT = 22;
const DEFAULT_WIDTH = 58;

const initData = (height: number, width: number): NodeType[][] => {
    return Array(height)
        .fill(null)
        .map(() => Array(width).fill(SIMPLE_NODE));
};

const mapDispatchToProps = {
    initGraph: initGraph,
    deleteNode: deleteNode,
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
    const [table, setTable] = React.useState([[]] as NodeType[][]);
    const [tableInitialized, setTableInitialized] = React.useState(false);

    const initSourceDest = () => {
        if (props.source?.id && props.destination?.id) {
            const sourceIndex = parseInt(props.source.id, 10);
            const destinationIdex = parseInt(props.destination.id, 10);

            const sourcePair = fromIndexToPair(sourceIndex, width);
            const destinationPair = fromIndexToPair(destinationIdex, width);

            const newTable = [...table];
            newTable[sourcePair.row][sourcePair.col] = SOURCE_NODE;
            newTable[destinationPair.row][destinationPair.col] = DESTINATION_NODE;
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
        <div className={classes.graphContainerAlgorithms}>
            {
                //alg options
                null
            }
            <Graph table={table} />
        </div>
    );
};

export default connector(GraphContainerAlgorithms);
