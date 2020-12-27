import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { SortingStacks } from '../../components/SortingStacks';
import SortOptionsButtonGroup from '../../components/SortOptionsButtonGroup';
import { changeAlgorithm, changeRunningState, changeSpeed, clearApp } from '../../store/app/actions';
import {
    changeHighest,
    changeListSize,
    changeLowest,
    changeSortingList,
    initSort,
    resetList,
} from '../../store/sorting/actions';
import { AlgorithmVisualizerState } from '../../store/state';
import {
    copyNumbersImmutable,
    getSorginAlgorithmOutput,
    isSortingAlgorithm,
} from '../../utils/sorting-utils-functions';
import {
    CURRENT_INDEX,
    FINISHED_LEFT_TO_MERGE,
    FINISHED_MERGE_PAIR,
    FINISHED_VISITING_INDEX,
    LEFT_TO_MERGE,
    MERGE_PAIR,
    PLACED_NUMBER,
    SortingOutputElementType,
    SWAPPED_PAIR,
    SWAP_PAIR,
} from '../../utils/types/sorting-types/sorting-results-types';
import {
    CURRENT_STACK,
    LEFT_TO_MERGE_STACK,
    MERGING_STACK,
    PUT_IN_PLACE,
    SWAP_STACK,
    UNVISITED_STACK,
} from '../../utils/types/sorting-types/sorting-stack-type';
import classes from './SortingContainerAlgorithms.module.css';

const DEFAULT_MIN = 1;
const DEFAULT_MAX = 50;

const MIN_ARR_LENGTH = 4;
const MAX_ARR_LENGTH = 90;

const DEFAULT_FIRST_PERIOD = 50;
const DEFAULT_INCREMENT = 50;

const SPEED_MAPPING = {
    'Low Speed': 4,
    'Medium Speed': 1,
    'High Speed': 0.2,
};

const mapDispatchToProps = {
    initSort: initSort,
    setSelectedAlg: changeAlgorithm,
    setSpeed: changeSpeed,
    setLowest: changeLowest,
    setHighest: changeHighest,
    changeSortingList: changeSortingList,
    setRunning: changeRunningState,
    changeRunningState: changeRunningState,
    clearApp: clearApp,
    resetList: resetList,
    setListSize: changeListSize,
};

const mapStateToProps = (state: AlgorithmVisualizerState) => ({
    running: state.app.running,
    lowest: state.sorting.lowest,
    highest: state.sorting.highest,
    nums: state.sorting.sortingList.numberList,
    selectedAlg: state.app.selectedAlg,
    sortingState: state.sorting,
    stacksList: state.sorting.sortingList.numberList,
    speed: state.app.speed,
    listSize: state.sorting.listSize,
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type SortingContainerAlgorithmsProps = ConnectedProps<typeof connector>;

const SortingContainerAlgorithms = (props: SortingContainerAlgorithmsProps): JSX.Element => {
    const [stillRunning, setStillRunning] = React.useState(false);
    const stackListRef = React.useRef(props.stacksList);
    stackListRef.current = props.stacksList;

    const speedMultiplier: number = SPEED_MAPPING[props.speed];

    React.useEffect(() => {
        props.setLowest(DEFAULT_MIN);
        props.setHighest(DEFAULT_MAX);
        props.setListSize(((MIN_ARR_LENGTH + MAX_ARR_LENGTH) / 2) | 0);
    }, []);

    React.useEffect(() => {
        if (props.lowest !== 0 && props.highest !== 0 && props.highest !== 0 && props.listSize > 0) {
            props.initSort(props.lowest, props.highest, props.listSize);
        }
    }, [props.lowest, props.highest, props.listSize]);

    const clearApp = () => {
        props.clearApp();
        props.resetList();
    };

    const handleAlgorithmStartsRunning = () => {
        const algSortingResult = getSorginAlgorithmOutput(props.selectedAlg, props.sortingState);

        let currentTimeoutDelay = DEFAULT_FIRST_PERIOD;
        algSortingResult.output.forEach((elem: SortingOutputElementType) => {
            setTimeout(() => {
                const newArray = copyNumbersImmutable(stackListRef.current);

                if (elem.type === PLACED_NUMBER) {
                    const index = elem.index;
                    newArray[index] = { ...newArray[index], elemType: PUT_IN_PLACE };
                } else if (elem.type === SWAP_PAIR) {
                    const { firstIndex, secondIndex } = elem;
                    newArray[firstIndex] = { ...newArray[firstIndex], elemType: SWAP_STACK };
                    newArray[secondIndex] = { ...newArray[secondIndex], elemType: SWAP_STACK };
                    const tmp = newArray[firstIndex];
                    newArray[firstIndex] = newArray[secondIndex];
                    newArray[secondIndex] = tmp;
                } else if (elem.type === CURRENT_INDEX) {
                    const index = elem.index;
                    newArray[index] = { ...newArray[index], elemType: CURRENT_STACK };
                } else if (elem.type === SWAPPED_PAIR) {
                    const { firstIndex, secondIndex } = elem;
                    newArray[firstIndex] = { ...newArray[firstIndex], elemType: UNVISITED_STACK };
                    newArray[secondIndex] = { ...newArray[secondIndex], elemType: UNVISITED_STACK };
                } else if (elem.type === FINISHED_VISITING_INDEX) {
                    const index = elem.index;
                    newArray[index] = { ...newArray[index], elemType: UNVISITED_STACK };
                } else if (elem.type === MERGE_PAIR) {
                    const { firstIndex, secondIndex } = elem;
                    newArray[firstIndex] = { ...newArray[firstIndex], elemType: MERGING_STACK };
                    newArray[secondIndex] = { ...newArray[secondIndex], elemType: MERGING_STACK };
                } else if (elem.type === FINISHED_MERGE_PAIR) {
                    const { firstIndex, secondIndex, currentIndex, placedNumber } = elem;
                    newArray[firstIndex] = { ...newArray[firstIndex], elemType: UNVISITED_STACK };
                    newArray[secondIndex] = { ...newArray[secondIndex], elemType: UNVISITED_STACK };
                    newArray[currentIndex] = { ...newArray[currentIndex], number: placedNumber };
                } else if (elem.type === LEFT_TO_MERGE) {
                    const index = elem.indexLeftToMerge;
                    newArray[index] = { ...newArray[index], elemType: LEFT_TO_MERGE_STACK };
                } else if (elem.type === FINISHED_LEFT_TO_MERGE) {
                    const { indexLeftToMerge, currentIndex, placedNumber } = elem;
                    newArray[indexLeftToMerge] = { ...newArray[indexLeftToMerge], elemType: UNVISITED_STACK };
                    newArray[currentIndex] = { ...newArray[currentIndex], number: placedNumber };
                }

                props.changeSortingList(newArray);
            }, currentTimeoutDelay * speedMultiplier);
            currentTimeoutDelay += DEFAULT_INCREMENT;
        });

        setTimeout(() => {
            props.setRunning(false);
            setStillRunning(false);
        }, currentTimeoutDelay * speedMultiplier);
    };

    React.useEffect(() => {
        if (props.running && !stillRunning && isSortingAlgorithm(props.selectedAlg)) {
            setStillRunning(true);
            handleAlgorithmStartsRunning();
        }
    }, [props.running, stillRunning, props.selectedAlg]);

    return (
        <>
            <SortOptionsButtonGroup
                minLength={MIN_ARR_LENGTH}
                maxLength={MAX_ARR_LENGTH}
                running={props.running}
                setSelectedAlg={props.setSelectedAlg}
                selectedAlg={props.selectedAlg}
                setSpeed={props.setSpeed}
                changeAppRunningState={props.changeRunningState}
                clearApp={clearApp}
                changeListSize={props.setListSize}
            />
            <div className={classes.sortingContainerAlgorithms}>
                <SortingStacks heights={props.nums} />
            </div>
        </>
    );
};

export default connector(SortingContainerAlgorithms);
