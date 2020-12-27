import React from 'react';
import { Dropdown } from 'semantic-ui-react';
import { speedStrToSpeed } from '../../utils/app-utils-functions';
import { SpeedType } from '../../utils/types/app-types/alg-speed-type';
import { AlgDropdownOption, AlgorithmType } from '../../utils/types/app-types/algorithm-classes-types';
import { speedDropdownOption } from '../../utils/types/app-types/consts';
import classes from './AlgPropSelector.module.css';

export type AlgPropSelectorProps = {
    algOptions: AlgDropdownOption[];
    speedOptions: speedDropdownOption[];
    running: boolean;
    setSelectedAlg: (alg: AlgorithmType) => void;
    setSpeed: (speed: SpeedType) => void;
    algStringToAlgType: (algName: string) => AlgorithmType;
};

const AlgPropSelector = (props: AlgPropSelectorProps): JSX.Element => {
    return (
        <>
            <Dropdown // Dropdown for Algorithm selection
                className={classes.select}
                selection
                options={props.algOptions}
                defaultValue={props.algOptions[0].value}
                onChange={(_, data) => {
                    if (data.value) props.setSelectedAlg(props.algStringToAlgType(data.value.toString()));
                }}
                disabled={props.running}
            />
            <Dropdown // Dropdown for speed selection
                className={`${classes.select}`}
                selection
                options={props.speedOptions}
                defaultValue={props.speedOptions[1].value}
                onChange={(_, data) => {
                    if (data.value) props.setSpeed(speedStrToSpeed(data.value.toString()));
                }}
                disabled={props.running}
            />
        </>
    );
};

export default AlgPropSelector;
