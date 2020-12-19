import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { SortingStacks } from '../../components/SortingStacks';
import SortOptionsButtonGroup from '../../components/SortOptionsButtonGroup';
import { changeAlgorithm, changeRunningState, changeSpeed } from '../../store/app/actions';
import { changeHighest, changeLowest, changeSortingList, initSort } from '../../store/sorting/actions';
import { AlgorithmVisualizerState } from '../../store/state';
import {
    copyNumbersImmutable,
    getSorginAlgorithmOutput,
    isSortingAlgorithm,
} from '../../utils/sorting-utils-functions';
import { ArrayStackType } from '../../utils/types/sorting-types/array-stack-type';
import {
    CURRENT_INDEX,
    FINISHED_VISITING_INDEX,
    PLACED_NUMBER,
    SortingOutputElementType,
    SWAPPED_PAIR,
    SWAP_PAIR,
} from '../../utils/types/sorting-types/sorting-results-types';
import {
    CURRENT_STACK,
    PUT_IN_PLACE,
    SWAP_STACK,
    UNVISITED_STACK,
} from '../../utils/types/sorting-types/sorting-stack-type';
import classes from './SortingContainerAlgorithms.module.css';

const DEFAULT_MIN = 1;
const DEFAULT_MAX = 50;

const DEFAULT_FIRST_PERIOD = 1;
const DEFAULT_INCREMENT = 1;

const mapDispatchToProps = {
    initSort: initSort,
    setSelectedAlg: changeAlgorithm,
    setSpeed: changeSpeed,
    setLowest: changeLowest,
    setHighest: changeHighest,
    changeSortingList: changeSortingList,
    setRunning: changeRunningState,
};

const mapStateToProps = (state: AlgorithmVisualizerState) => ({
    running: state.app.running,
    lowest: state.sorting.lowest,
    highest: state.sorting.highset,
    nums: state.sorting.sortingList.numberList,
    selectedAlg: state.app.selectedAlg,
    sortingState: state.sorting,
    stacksList: state.sorting.sortingList.numberList,
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type SortingContainerAlgorithmsProps = ConnectedProps<typeof connector>;

const SortingContainerAlgorithms = (props: SortingContainerAlgorithmsProps): JSX.Element => {
    const [stillRunning, setStillRunning] = React.useState(false);
    const stackListRef = React.useRef(props.stacksList);
    stackListRef.current = props.stacksList;

    React.useEffect(() => {
        props.setLowest(DEFAULT_MIN);
        props.setHighest(DEFAULT_MAX);
    }, []);

    React.useEffect(() => {
        if (props.lowest !== 0 && props.highest !== 0 && props.highest !== 0) {
            props.initSort(props.lowest, props.highest);
        }
    }, [props.lowest, props.highest]);

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
                }
                props.changeSortingList(newArray);
            }, currentTimeoutDelay);
            currentTimeoutDelay += DEFAULT_INCREMENT;
        });

        setTimeout(() => {
            props.setRunning(false);
            setStillRunning(false);
        }, currentTimeoutDelay);
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
                running={props.running}
                setSelectedAlg={props.setSelectedAlg}
                selectedAlg={props.selectedAlg}
                setSpeed={props.setSpeed}
            />
            <div className={classes.sortingContainerAlgorithms}>
                <SortingStacks heights={props.nums} />
            </div>
        </>
    );
};

export default connector(SortingContainerAlgorithms);
