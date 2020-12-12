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
import { GraphAlgoirhtmsType } from '../../utils/types/graph-algorithms/algorithm-types';
import { Dropdown } from 'semantic-ui-react';
import { AlgorithmType } from '../../App';
import { algNameToAlgType, speedStrToSpeed } from '../../utils/utilsFunctions';
import { SpeedType } from '../../utils/types/graph-algorithms/alg-speed-type';

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

const algDropdownOptions = [
    {
        key: 'Breadth First Search',
        value: 'Breadth First Search',
        text: 'Breadth First Search',
    },
    {
        key: "Dijkstra's Algorithm",
        value: "Dijkstra's Algorithm",
        text: "Dijkstra's Algorithm",
    },

    {
        key: 'A* Alrogithm',
        value: 'A* Algorithm',
        text: 'A* Algorithm',
    },
    {
        key: 'Best First Search',
        value: 'Best First Search',
        text: 'Best First Search',
    },
];

const speedDropdownOptions = [
    {
        key: 'Low Speed',
        value: 'Low Speed',
        text: 'Low Speed',
    },
    {
        key: 'Medium Speed',
        value: 'Medium Speed',
        text: 'Medium Speed',
    },
    {
        key: 'High Speed',
        value: 'High Speed',
        text: 'High Speed',
    },
];

type NodeTypeButtonGroupProps = {
    activeNodeTypeButton?: NodeTypeButtonType;
    setActiveNodeTypeButton: Dispatch<SetStateAction<NodeTypeButtonType>>;
    selectedAlg: GraphAlgoirhtmsType;
    running: boolean;
    clearApp: () => void;
    changeAppRunningState: (newState: boolean) => void;
    setSelectedAlg: (alg: AlgorithmType) => void;
    setSpeed: (speed: SpeedType) => void;
};

const NodeTypeButtonGroup = (props: NodeTypeButtonGroupProps): JSX.Element => {
    const clear = () => {
        props.changeAppRunningState(false);
        props.clearApp();
        window.location.reload();
        //TODO: this is a hacky way to do this, solve this issue
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
        <>
            <div className={classes.nodeTypeButtonGroup}>
                <Dropdown // Dropdown for Algorithm selection
                    className={classes.select}
                    selection
                    options={algDropdownOptions}
                    defaultValue={algDropdownOptions[0].value}
                    onChange={(_, data) => {
                        if (data.value) props.setSelectedAlg(algNameToAlgType(data.value.toString()));
                    }}
                    disabled={props.running}
                />
                <Dropdown // Dropdown for speed selection
                    className={classes.select}
                    selection
                    options={speedDropdownOptions}
                    defaultValue={speedDropdownOptions[1].value}
                    onChange={(_, data) => {
                        if (data.value) props.setSpeed(speedStrToSpeed(data.value.toString()));
                    }}
                    disabled={props.running}
                />
                <ButtonGroup className={classes.buttons}>{getInitButtons()}</ButtonGroup>
                <Button //clear button
                    onClick={clear}
                    className={classes.clearButton}
                    variant="outline-danger"
                    disabled={props.running && props.running === true}
                >
                    Clear
                </Button>
            </div>
        </>
    );
};

export default NodeTypeButtonGroup;
