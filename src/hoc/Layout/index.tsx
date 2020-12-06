import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import Toolbar from '../../components/Navigation/Toolbar';
import { changeAlgorithm, changeRunningState } from '../../store/app/actions';
import { AlgorithmVisualizerState } from '../../store/state';

interface BasicLayoutProps {
    children: React.ReactNode[] | React.ReactNode;
    title: string;
}
const mapDispatchToProps = {
    setSelectedAlgorithm: changeAlgorithm,
    changeAppRunningState: changeRunningState,
};

const mapStateToProps = (state: AlgorithmVisualizerState, ownProps: BasicLayoutProps) => ({
    selectedAlgorithm: state.app.selectedAlg,
    children: ownProps.children,
    title: ownProps.title,
});

const connector = connect(mapStateToProps, mapDispatchToProps);
type LayoutProps = ConnectedProps<typeof connector>;

const Layout = (props: LayoutProps): JSX.Element => {
    return (
        <>
            <Toolbar
                title={props.title}
                selectedAlg={props.selectedAlgorithm}
                setSelectedAlg={props.setSelectedAlgorithm}
                changeRunningState={props.changeAppRunningState}
            />
            <main>{props.children}</main>
        </>
    );
};

export default connector(Layout);
