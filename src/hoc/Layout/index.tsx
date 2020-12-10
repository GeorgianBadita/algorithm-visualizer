import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import Toolbar from '../../components/Navigation/Toolbar';
import { changeAlgorithm, changeRunningState, changeSpeed, clearApp } from '../../store/app/actions';
import { clearGraph, resetGraphForNewAlgorithm } from '../../store/graph/actions';
import { AlgorithmVisualizerState } from '../../store/state';

interface BasicLayoutProps {
    children: React.ReactNode[] | React.ReactNode;
    title: string;
}
const mapDispatchToProps = {
    setSelectedAlgorithm: changeAlgorithm,
    changeAppRunningState: changeRunningState,
    clearAppState: clearApp,
    clearGraph: clearGraph,
    resetGraphForRunningAlg: resetGraphForNewAlgorithm,
    changeSpeed: changeSpeed,
};

const mapStateToProps = (state: AlgorithmVisualizerState, ownProps: BasicLayoutProps) => ({
    selectedAlgorithm: state.app.selectedAlg,
    children: ownProps.children,
    title: ownProps.title,
    running: state.app.running,
});

const connector = connect(mapStateToProps, mapDispatchToProps);
type LayoutProps = ConnectedProps<typeof connector>;

const Layout = (props: LayoutProps): JSX.Element => {
    return (
        <>
            <Toolbar
                title={props.title}
                running={props.running}
                selectedAlg={props.selectedAlgorithm}
                setSelectedAlg={props.setSelectedAlgorithm}
                changeRunningState={props.changeAppRunningState}
                resetGraphForRunningAlg={props.resetGraphForRunningAlg}
                changeAlgSpeed={props.changeSpeed}
            />
            <main>{props.children}</main>
        </>
    );
};

export default connector(Layout);
