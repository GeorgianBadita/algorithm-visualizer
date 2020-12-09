import React from 'react';

import Node from './Node/index';
import classes from './Graph.module.css';

import { checkCanPutWeight, getNewGrid, reduxGraphUpdateDispatchHelper } from '../../utils/utilsFunctions';
import { TableNodeType } from '../../containers/GraphContainerAlgorithms';
import { GraphNode } from '../../algorithms/graph-algorithms/graph';
import { GraphActionTypes } from '../../store/graph/types';
import { NodeTypeButtonType } from '../../utils/types/graph-algorithms/node-type-button-type';
import { GraphAlgoirhtmsType } from '../../utils/types/graph-algorithms/algorithm-types';
import { toast } from 'react-toastify';

const DEFAULT_WEIGHT_VALUE = 10;

type GraphProps = {
    height: number;
    width: number;
    table: TableNodeType[][];
    activeNodeTypeButton: NodeTypeButtonType;
    selectedAlg: GraphAlgoirhtmsType;
    setGraph: (value: TableNodeType[][]) => void;
    running: boolean;
    changeSourceNode: (newSoruce: GraphNode) => GraphActionTypes;
    changeDestinationNode: (newDest: GraphNode) => GraphActionTypes;
    deleteNode: (node: GraphNode) => GraphActionTypes;
    addNode: (node: GraphNode, table: TableNodeType[][]) => GraphActionTypes;
    addWeightedNode: (node: GraphNode, table: TableNodeType[][]) => GraphActionTypes;
};

const Graph = (props: GraphProps): JSX.Element => {
    const [isClicked, setIsClicked] = React.useState(false);

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
        props.setGraph(getNewGrid(props.table, props.activeNodeTypeButton, x, y));
        reduxGraphUpdateDispatchHelper(
            props.table,
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
    };

    const handleOnMouseUp = () => {
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
        props.setGraph(getNewGrid(props.table, props.activeNodeTypeButton, x, y));
        reduxGraphUpdateDispatchHelper(
            props.table,
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
