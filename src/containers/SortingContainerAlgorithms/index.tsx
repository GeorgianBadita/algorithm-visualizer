import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { SortingStacks } from '../../components/SortingStacks';
import { changeAlgorithm } from '../../store/app/actions';
import { changeHighest, changeLowest, initSort } from '../../store/sorting/actions';
import { AlgorithmVisualizerState } from '../../store/state';
import classes from './SortingContainerAlgorithms.module.css';

const DEFAULT_MIN = 1;
const DEFAULT_MAX = 50;

const mapDispatchToProps = {
    initSort: initSort,
    setSelectedAlg: changeAlgorithm,
    setLowest: changeLowest,
    setHighest: changeHighest,
};

const mapStateToProps = (state: AlgorithmVisualizerState) => ({
    running: state.app.running,
    lowest: state.sorting.lowest,
    highest: state.sorting.highset,
    nums: state.sorting.sortingList.numberList,
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type SortingContainerAlgorithmsProps = ConnectedProps<typeof connector>;

const SortingContainerAlgorithms = (props: SortingContainerAlgorithmsProps): JSX.Element => {
    React.useEffect(() => {
        props.setLowest(DEFAULT_MIN);
        props.setHighest(DEFAULT_MAX);
    }, []);

    React.useEffect(() => {
        if (props.lowest !== 0 && props.highest !== 0 && props.highest !== 0) {
            props.initSort(props.lowest, props.highest);
        }
    }, [props.lowest, props.highest]);

    return (
        <div className={classes.sortingContainerAlgorithms}>
            <SortingStacks heights={props.nums} />
        </div>
    );
};

export default connector(SortingContainerAlgorithms);
