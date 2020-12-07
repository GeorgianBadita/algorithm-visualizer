import React from 'react';
import {
    DESTINATION_NODE,
    NodeType,
    SHORTEST_PATH_NODE,
    SOURCE_NODE,
    VISITED_NODE,
    WALL_NODE,
    WEIGHTED_NODE,
} from '../../../utils/types/graph-algorithms/node-type';
import classes from './Node.module.css';

type NodeProps = {
    onMouseEnter: (x: number, y: number) => void;
    onMouseDown: (x: number, y: number) => void;
    nodeType: NodeType;
    row: number;
    col: number;
    weight?: number;
};

const Node = (props: NodeProps): JSX.Element => {
    const cssClasses = [classes.node];
    if (props.nodeType === SOURCE_NODE) {
        cssClasses.push(classes.source);
    } else if (props.nodeType === DESTINATION_NODE) {
        cssClasses.push(classes.destination);
    } else if (props.nodeType === WALL_NODE) {
        cssClasses.push(classes.wall);
    } else if (props.nodeType === WEIGHTED_NODE) {
        cssClasses.push(classes.weight);
    } else if (props.nodeType === VISITED_NODE) {
        cssClasses.push(classes.visited);
    } else if (props.nodeType === SHORTEST_PATH_NODE) {
        cssClasses.push(classes.shortestPath);
    }
    return (
        <div
            onMouseDown={() => props.onMouseDown(props.row, props.col)}
            onMouseEnter={() => props.onMouseEnter(props.row, props.col)}
            className={cssClasses.join(' ')}
        >
            {props.nodeType === WEIGHTED_NODE ? props.weight : ''}
        </div>
    );
};
export default React.memo(Node);
