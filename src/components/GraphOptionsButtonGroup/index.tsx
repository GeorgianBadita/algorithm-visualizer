import React, { Dispatch, SetStateAction } from 'react';
import { NodeTypeButtonType } from '../../utils/types/graph-types/node-type-button-type';
import classes from './GraphOptionsButtonGrooup.module.css';

import { SpeedType } from '../../utils/types/app-types/alg-speed-type';
import { AlgorithmType } from '../../utils/types/app-types/algorithm-classes-types';
import { addNodesDropdownOptions, graphAlgDropdownOptions } from '../../utils/types/graph-types/consts';
import { speedDropdownOptions } from '../../utils/types/app-types/consts';
import AlgPropSelector from '../AlgPropSelector';
import { algNameToAlgType, isGraphAlgorithm } from '../../utils/graph-utils-functions';
import { BREADTH_FIRST_SEARCH, NO_ALGORITHM } from '../../utils/types/graph-types/graph-algorithm-types';
import { Dropdown } from 'semantic-ui-react';

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
    clearButton: () => void;
};

const NodeTypeButtonGroup = (props: NodeTypeButtonGroupProps): JSX.Element => {
    const handleOnAlgStart = () => {
        props.changeAppRunningState(true);
        if (isGraphAlgorithm(props.selectedAlg)) {
            props.resetGraphForAlg();
        }
    };

    if (props.selectedAlg === NO_ALGORITHM || !isGraphAlgorithm(props.selectedAlg)) {
        props.setSelectedAlg(BREADTH_FIRST_SEARCH);
    }

    return (
        <>
            <div className={classes.nodeTypeButtonGroup}>
                <button //clear button
                    onClick={props.clearButton}
                    className={`${classes.btn} ${classes.clearButton}`}
                    disabled={props.running && props.running === true}
                >
                    Clear Graph
                </button>
                <AlgPropSelector
                    algOptions={graphAlgDropdownOptions}
                    speedOptions={speedDropdownOptions}
                    setSelectedAlg={props.setSelectedAlg}
                    setSpeed={props.setSpeed}
                    running={props.running}
                    algStringToAlgType={algNameToAlgType}
                />
                <Dropdown
                    className={classes.dropdown}
                    options={addNodesDropdownOptions}
                    defaultValue={addNodesDropdownOptions[2].value}
                    onChange={(_, data) => props.setActiveNodeTypeButton(data.value as NodeTypeButtonType)}
                    disabled={props.running && props.running === true}
                />
                <button //start button
                    onClick={props.running && props.running === true ? props.clearApp : handleOnAlgStart}
                    className={`${classes.btn} ${classes.startButton}`}
                >
                    {props.running && props.running === true ? 'Stop Algorithm' : 'Start Algorithm'}
                </button>
            </div>
        </>
    );
};

export default NodeTypeButtonGroup;
