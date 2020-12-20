import React, { Dispatch, SetStateAction } from 'react';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { NodeTypeButtonType } from '../../utils/types/graph-types/node-type-button-type';
import NodeTypeButton from './NodeTypeButton';
import classes from './GraphOptionsButtonGrooup.module.css';

import Button from 'react-bootstrap/Button';
import { SpeedType } from '../../utils/types/app-types/alg-speed-type';
import { AlgorithmType } from '../../utils/types/app-types/algorithm-classes-types';
import { graphAlgDropdownOptions, nodeButtons } from '../../utils/types/graph-types/consts';
import { speedDropdownOptions } from '../../utils/types/app-types/consts';
import AlgPropSelector from '../AlgPropSelector';
import { algNameToAlgType, isGraphAlgorithm } from '../../utils/graph-utils-functions';
import { BREADTH_FIRST_SEARCH, NO_ALGORITHM } from '../../utils/types/graph-types/graph-algorithm-types';

type NodeTypeButtonGroupProps = {
    activeNodeTypeButton?: NodeTypeButtonType;
    setActiveNodeTypeButton: Dispatch<SetStateAction<NodeTypeButtonType>>;
    selectedAlg: AlgorithmType;
    running: boolean;
    clearApp: () => void;
    changeAppRunningState: (newState: boolean) => void;
    setSelectedAlg: (alg: AlgorithmType) => void;
    setSpeed: (speed: SpeedType) => void;
    resetGraphForAlg: () => void;
};

const NodeTypeButtonGroup = (props: NodeTypeButtonGroupProps): JSX.Element => {
    const clear = () => {
        props.changeAppRunningState(false);
        props.clearApp();
        window.location.reload();
        //TODO: this is a hacky way to do this, solve this issue
    };

    const handleOnAlgStart = () => {
        props.changeAppRunningState(true);
        if (isGraphAlgorithm(props.selectedAlg)) {
            props.resetGraphForAlg();
        }
    };

    const getInitButtons = (): JSX.Element[] => {
        return nodeButtons.map((buttonData) => (
            <NodeTypeButton
                buttonType={buttonData.type as NodeTypeButtonType}
                key={buttonData.text}
                text={buttonData.text}
                image={buttonData.image}
                active={buttonData.type === props.activeNodeTypeButton ? true : false}
                setActiveNodeButtonType={props.setActiveNodeTypeButton}
            />
        ));
    };

    if (props.selectedAlg === NO_ALGORITHM || !isGraphAlgorithm(props.selectedAlg)) {
        props.setSelectedAlg(BREADTH_FIRST_SEARCH);
    }

    return (
        <>
            <div className={classes.nodeTypeButtonGroup}>
                <Button //clear button
                    onClick={handleOnAlgStart}
                    className={classes.startButton}
                    disabled={props.running && props.running === true}
                >
                    Start Algorithm
                </Button>
                <AlgPropSelector
                    algOptions={graphAlgDropdownOptions}
                    speedOptions={speedDropdownOptions}
                    setSelectedAlg={props.setSelectedAlg}
                    setSpeed={props.setSpeed}
                    running={props.running}
                    algStringToAlgType={algNameToAlgType}
                />
                <Button //clear button
                    onClick={clear}
                    className={classes.clearButton}
                    variant="outline-danger"
                    disabled={props.running && props.running === true}
                >
                    Clear
                </Button>
                <ButtonGroup className={classes.buttons}>{getInitButtons()}</ButtonGroup>
            </div>
        </>
    );
};

export default NodeTypeButtonGroup;
