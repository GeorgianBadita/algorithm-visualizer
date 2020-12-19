import React from 'react';
import { isSortingAlgorithm, sortNameToSortType } from '../../utils/sorting-utils-functions';
import { SpeedType } from '../../utils/types/app-types/alg-speed-type';
import { AlgorithmType } from '../../utils/types/app-types/algorithm-classes-types';
import { speedDropdownOptions } from '../../utils/types/app-types/consts';
import { NO_ALGORITHM } from '../../utils/types/graph-types/graph-algorithm-types';
import { sortingAlgDropdownOptions } from '../../utils/types/sorting-types/consts';
import { BUBBLE_SORT } from '../../utils/types/sorting-types/sorting-alorithm-types';
import AlgPropSelector from '../AlgPropSelector';
import classes from './SortOptionsButtonGroup.module.css';

export type SortOptionsButtonGroupProps = {
    setSelectedAlg: (alg: AlgorithmType) => void;
    setSpeed: (speed: SpeedType) => void;
    running: boolean;
    selectedAlg: AlgorithmType;
};

const SortOptionsButtonGroup = (props: SortOptionsButtonGroupProps): JSX.Element => {
    if (props.selectedAlg === NO_ALGORITHM || !isSortingAlgorithm(props.selectedAlg)) {
        props.setSelectedAlg(BUBBLE_SORT);
    }
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
