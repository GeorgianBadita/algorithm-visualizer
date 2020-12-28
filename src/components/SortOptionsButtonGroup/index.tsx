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
import LabeledSlider from '../LabeledSlider';

export type SortOptionsButtonGroupProps = {
    setSelectedAlg: (alg: AlgorithmType) => void;
    setSpeed: (speed: SpeedType) => void;
    running: boolean;
    selectedAlg: AlgorithmType;
    clearApp: () => void;
    changeAppRunningState: (newState: boolean) => void;
    minLength: number;
    maxLength: number;
    changeListSize: (newSize: number) => void;
    resetList: () => void;
    reInitList: () => void;
};

const SortOptionsButtonGroup = (props: SortOptionsButtonGroupProps): JSX.Element => {
    const regenerateList = () => {
        props.clearApp();
        props.resetList();
    };

    const handleOnAlgStart = () => {
        props.changeAppRunningState(true);
        if (isSortingAlgorithm(props.selectedAlg)) {
            props.reInitList();
        }
    };

    if (props.selectedAlg === NO_ALGORITHM || !isSortingAlgorithm(props.selectedAlg)) {
        props.setSelectedAlg(BUBBLE_SORT);
    }

    const [sliderValue, setSliderValue] = React.useState(((props.minLength + props.maxLength) / 2) | 0);

    const onSliderChange = (newVal: number): void => {
        setSliderValue(newVal);
        props.changeListSize(newVal);
    };

    return (
        <>
            <div className={classes.sortOptionsButtonGroup}>
                <button
                    className={`${classes.btn} ${classes.clearButton}`}
                    disabled={props.running}
                    onClick={regenerateList}
                >
                    Generate New List
                </button>

                <div className={classes.slider}>
                    <LabeledSlider
                        disabled={props.running}
                        min={props.minLength}
                        sliderValue={sliderValue}
                        max={props.maxLength}
                        step={1}
                        onSliderChange={onSliderChange}
                    />
                </div>
                <AlgPropSelector
                    running={props.running}
                    setSelectedAlg={props.setSelectedAlg}
                    setSpeed={props.setSpeed}
                    algOptions={sortingAlgDropdownOptions}
                    speedOptions={speedDropdownOptions}
                    algStringToAlgType={sortNameToSortType}
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

export default SortOptionsButtonGroup;
