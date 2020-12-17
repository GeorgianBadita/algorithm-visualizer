import React from 'react';
import { sortNameToSortType } from '../../utils/sorting-utils-functions';
import { SpeedType } from '../../utils/types/app-types/alg-speed-type';
import { AlgorithmType } from '../../utils/types/app-types/algorithm-classes-types';
import { speedDropdownOptions } from '../../utils/types/app-types/consts';
import { sortingAlgDropdownOptions } from '../../utils/types/sorting-types/consts';
import AlgPropSelector from '../AlgPropSelector';
import classes from './SortOptionsButtonGroup.module.css';

export type SortOptionsButtonGroupProps = {
    setSelectedAlg: (alg: AlgorithmType) => void;
    setSpeed: (speed: SpeedType) => void;
    running: boolean;
};

const SortOptionsButtonGroup = (props: SortOptionsButtonGroupProps): JSX.Element => {
    return (
        <div className={classes.sortOptionsButtonGroup}>
            <AlgPropSelector
                running={props.running}
                setSelectedAlg={props.setSelectedAlg}
                setSpeed={props.setSpeed}
                algOptions={sortingAlgDropdownOptions}
                speedOptions={speedDropdownOptions}
                algStringToAlgType={sortNameToSortType}
            />
        </div>
    );
};

export default SortOptionsButtonGroup;
