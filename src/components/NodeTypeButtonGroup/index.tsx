import React, { Dispatch, SetStateAction } from 'react';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import {
    DESTINATION_NODE_BUTTON,
    RESTORE_NODE_BUTTON,
    SOURCE_NODE_BUTTON,
    WALL_NODE_BUTTON,
    WEIGHTED_NODE_BUTTON,
    NodeTypeButtonType,
} from '../../utils/types/graph-algorithms/node-type-button-type';
import NodeTypeButton from './NodeTypeButton';
import classes from './NodeTypeButtonGroup.module.css';
import start from '../../assets/images/start.png';
import destination from '../../assets/images/destination.png';
import wall from '../../assets/images/wall.png';
import weight from '../../assets/images/weight.png';
import simple from '../../assets/images/simple.png';
import Button from 'react-bootstrap/Button';
import { GraphAlgoirhtmsType, NO_ALGORITHM } from '../../utils/types/graph-algorithms/algorithm-types';

type ButtonData = {
    text: string;
    image: string;
    active: boolean;
    type: NodeTypeButtonType;
};

const initButtons: ButtonData[] = [
    {
        text: 'Add wall nodes',
        image: wall,
        active: false,
        type: WALL_NODE_BUTTON,
    },
    {
        text: 'Add weighted nodes',
        image: weight,
        active: false,
        type: WEIGHTED_NODE_BUTTON,
    },
    {
        text: 'Restore nodes',
        image: simple,
        active: false,
        type: RESTORE_NODE_BUTTON,
    },
    {
        text: 'Move source node',
        image: start,
        active: false,
        type: SOURCE_NODE_BUTTON,
    },
    {
        text: 'Move destination node',
        image: destination,
        active: false,
        type: DESTINATION_NODE_BUTTON,
    },
];

type NodeTypeButtonGroupProps = {
    activeNodeTypeButton?: NodeTypeButtonType;
    setActiveNodeTypeButton: Dispatch<SetStateAction<NodeTypeButtonType>>;
    selectedAlg: GraphAlgoirhtmsType;
    running: boolean;
    clearApp: () => void;
    changeAppRunningState: (newState: boolean) => void;
};

const NodeTypeButtonGroup = (props: NodeTypeButtonGroupProps): JSX.Element => {
    const clear = () => {
        props.changeAppRunningState(false);
        props.clearApp();
    };

    const getInitButtons = (): JSX.Element[] => {
        return initButtons.map((buttonData) => (
            <NodeTypeButton
                buttonType={buttonData.type}
                key={buttonData.text}
                text={buttonData.text}
                image={buttonData.image}
                active={buttonData.type === props.activeNodeTypeButton ? true : false}
                setActiveNodeButtonType={props.setActiveNodeTypeButton}
            />
        ));
    };

    return (
        <div className={classes.nodeTypeButtonGroup}>
            <ButtonGroup className={classes.buttons}>{getInitButtons()}</ButtonGroup>
            <Button
                onClick={() => clear()}
                className={classes.clearButton}
                disabled={props.running && props.running === true}
            >
                Clear
            </Button>
        </div>
    );
};

export default NodeTypeButtonGroup;
