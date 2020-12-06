import React, { Dispatch, SetStateAction } from 'react';

import Node from './Node/index';
import classes from './Graph.module.css';
import {
    DESTINATION_NODE_BUTTON,
    NodeTypeButtonType,
    SOURCE_NODE_BUTTON,
    WALL_NODE_BUTTON,
} from '../NodeTypeButtonGroup/NodeTypeButton';
import { fromPairToIndex, getNewGrid, reduxGraphUpdateDispatchHelper } from '../../utils/utilsFunctions';
import { TableNodeType } from '../../containers/GraphContainerAlgorithms';
import { GraphNode } from '../../algorithms/graph-algorithms/graph';
import { GraphActionTypes } from '../../store/graph/types';

type GraphProps = {
    height: number;
    width: number;
    table: TableNodeType[][];
    activeNodeTypeButton: NodeTypeButtonType;
    setGraph: Dispatch<SetStateAction<TableNodeType[][]>>;
    changeSourceNode: (newSoruce: GraphNode) => GraphActionTypes;
    changeDestinationNode: (newDest: GraphNode) => GraphActionTypes;
    deleteNode: (node: GraphNode) => GraphActionTypes;
    addNode: (node: GraphNode, table: TableNodeType[][]) => GraphActionTypes;
};

const Graph = (props: GraphProps): JSX.Element => {
    const [isClicked, setIsClicked] = React.useState(false);

    const handleOnMouseEnter = (x: number, y: number): void => {
        if (!isClicked) return;
        props.setGraph(getNewGrid(props.table, props.activeNodeTypeButton, x, y));
        reduxGraphUpdateDispatchHelper(
            props.table,
            props.activeNodeTypeButton,
            props.changeSourceNode,
            props.changeDestinationNode,
            props.deleteNode,
            props.addNode,
            x,
            y,
            props.width,
        );
    };

    const handleOnMouseUp = () => {
        setIsClicked(false);
    };

    const handleOnMouseDown = (x: number, y: number) => {
        props.setGraph(getNewGrid(props.table, props.activeNodeTypeButton, x, y));
        reduxGraphUpdateDispatchHelper(
            props.table,
            props.activeNodeTypeButton,
            props.changeSourceNode,
            props.changeDestinationNode,
            props.deleteNode,
            props.addNode,
            x,
            y,
            props.width,
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

export default Graph;
