import React from 'react';
import Button from 'react-bootstrap/esm/Button';
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
};

const SortOptionsButtonGroup = (props: SortOptionsButtonGroupProps): JSX.Element => {
    const regenerateList = () => {
        props.changeAppRunningState(false);
        props.clearApp();
        window.location.reload();
        //TODO: this is a hacky way to do this, solve this issue
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
        <div className={classes.sortOptionsButtonGroup}>
            <AlgPropSelector
                running={props.running}
                setSelectedAlg={props.setSelectedAlg}
                setSpeed={props.setSpeed}
                algOptions={sortingAlgDropdownOptions}
                speedOptions={speedDropdownOptions}
                algStringToAlgType={sortNameToSortType}
            />
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
            <Button
                disabled={props.running}
                className={classes.regenerateButton}
                onClick={regenerateList}
                variant="outline-danger"
            >
                Generate New List
            </Button>
        </div>
    );
};

export default SortOptionsButtonGroup;
