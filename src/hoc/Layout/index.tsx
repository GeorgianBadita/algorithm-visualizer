import React from 'react';
import Toolbar from '../../components/Navigation/Toolbar';

interface LayoutProps {
    children: React.ReactNode[] | React.ReactNode;
}

const Layout = (props: LayoutProps): JSX.Element => {
    return (
        <>
            <Toolbar />
            <main>{props.children}</main>
        </>
    );
};

export default Layout;
