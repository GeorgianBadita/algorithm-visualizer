import React from 'react';
import classes from './Node.module.css';

export const WEIGHTED_NODE = 'WEIGHTED_NODE';
export const SIMPLE_NODE = 'SIMPLE_NODE';
export const WALL_NODE = 'WALL_NODE';
export const SOURCE_NODE = 'START_NODE';
export const DESTINATION_NODE = 'DESTINATION_NODE';

export type NodeType =
    | typeof WEIGHTED_NODE
    | typeof SIMPLE_NODE
    | typeof WALL_NODE
    | typeof SOURCE_NODE
    | typeof DESTINATION_NODE;

type NodeProps = {
    nodeType: NodeType;
    row: number;
    col: number;
    weight?: number;
    onClick?: () => void;
};

const Node = (props: NodeProps): JSX.Element => {
    const cssClasses = [classes.node];
    if (props.nodeType === SOURCE_NODE) {
        cssClasses.push(classes.source);
    } else if (props.nodeType === DESTINATION_NODE) {
        cssClasses.push(classes.destination);
    }
    return (
        <div onClick={props.onClick} className={cssClasses.join(' ')}>
            {props.nodeType === WEIGHTED_NODE ? props.weight : ''}
        </div>
    );
};
export default Node;
