import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import Toolbar from '../../components/Navigation/Toolbar';
import { clearApp } from '../../store/app/actions';
import { clearGraph } from '../../store/graph/actions';
import { resetList } from '../../store/sorting/actions';

export type InitialLayoutProps = {
    children: React.ReactNode[] | React.ReactNode;
};

const mapDispatchToProps = {
    clearApp: clearApp,
    clearGraph: clearGraph,
    clearList: resetList,
};

const connector = connect(null, mapDispatchToProps);

type LayoutProps = ConnectedProps<typeof connector> & InitialLayoutProps;

const Layout = (props: LayoutProps): JSX.Element => {
    const clearApp = () => {
        // props.clearGraph();
        props.clearList();
        props.clearApp();
    };

    return (
        <>
            <Toolbar clearApp={clearApp} />
            <main>{props.children}</main>
        </>
    );
};

export default connector(Layout);
