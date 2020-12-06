import React, { Dispatch, SetStateAction } from 'react';
import NodeTypeImage from './NodeTypeImage';
import classes from './NodeTypeButton.module.css';

export const WALL_NODE_BUTTON = 'WALL_NODE_BUTTON';
export const RESTORE_NODE_BUTTON = 'RESTORE_NODE_BUTTON';
export const WEIGHTED_NODE_BUTTON = 'WEIGHTED_NODE_BUTTON';
export const SOURCE_NODE_BUTTON = 'SOURCE_NODE_BUTTON';
export const DESTINATION_NODE_BUTTON = 'DESTINATION_NODE_BUTTON';

export type NodeTypeButtonType =
    | typeof WALL_NODE_BUTTON
    | typeof RESTORE_NODE_BUTTON
    | typeof WEIGHTED_NODE_BUTTON
    | typeof SOURCE_NODE_BUTTON
    | typeof DESTINATION_NODE_BUTTON;

type NodeTypeButtonProps = {
    buttonType: NodeTypeButtonType;
    text: string;
    image: string;
    active: boolean;
    setActiveNodeButtonType: Dispatch<SetStateAction<NodeTypeButtonType>>;
};

const NodeTypeButton = (props: NodeTypeButtonProps): JSX.Element => {
    const cssClasses = [classes.nodeTypeButton];
    if (props.active) {
        cssClasses.push(classes.nodeTypeButtonActive);
    }

    return (
        <button className={cssClasses.join(' ')} onClick={() => props.setActiveNodeButtonType(props.buttonType)}>
            <NodeTypeImage image={props.image} altTxt={props.text} />
            {props.text}
        </button>
    );
};

export default NodeTypeButton;
