import React, { Dispatch, SetStateAction } from 'react';
import NodeTypeImage from './NodeTypeImage';
import classes from './NodeTypeButton.module.css';
import Button from 'react-bootstrap/esm/Button';

const WALL_NODE_BUTTON = 'WALL_NODE_BUTTON';
const SIMPLE_NODE_BUTTON = 'SIMPLE_NODE_BUTTON';
const WEIGHTED_NODE_BUTTON = 'WEIGHTED_NODE_BUTTON';
const SOURCE_NODE_BUTTON = 'SOURCE_NODE_BUTTON';
const DESTINATION_NODE_BUTTON = 'DESTINATION_NODE_BUTTON';

export type NodeTypeButton =
    | typeof WALL_NODE_BUTTON
    | typeof SIMPLE_NODE_BUTTON
    | typeof WEIGHTED_NODE_BUTTON
    | typeof SOURCE_NODE_BUTTON
    | typeof DESTINATION_NODE_BUTTON;

type NodeTypeButtonProps = {
    buttonType?: typeof NodeTypeButton;
    text: string;
    image: string;
    active: boolean;
    oncClick: Dispatch<SetStateAction<string>>;
};

const NodeTypeButton = (props: NodeTypeButtonProps): JSX.Element => {
    const cssClasses = [classes.nodeTypeButton];
    if (props.active) {
        cssClasses.push(classes.nodeTypeButtonActive);
    }

    return (
        <button className={cssClasses.join(' ')} onClick={() => props.oncClick(props.text)}>
            <NodeTypeImage image={props.image} altTxt={props.text} />
            {props.text}
        </button>
    );
};

export default NodeTypeButton;
