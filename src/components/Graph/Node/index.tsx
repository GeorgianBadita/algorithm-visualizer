import React from 'react';
import classes from './Node.module.css';

export const WEIGHTED_NODE = 'WEIGHTED_NODE';
export const SIMPLE_NODE = 'SIMPLE_NODE';
export const WALL_NODE = 'WALL_NODE';

type NodeProps = {
    nodeType: typeof WEIGHTED_NODE | typeof SIMPLE_NODE | typeof WALL_NODE;
    weight?: number;
    onClick?: () => void;
};

const Node = (props: NodeProps): JSX.Element => (
    <div onClick={props.onClick} className={classes.node}>
        {props.weight || ''}
    </div>
);
export default Node;
