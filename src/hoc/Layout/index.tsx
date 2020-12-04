import React from 'react';
import Toolbar from '../../components/Navigation/Toolbar';

type LayoutProps = {
    children: React.ReactNode[] | React.ReactNode;
    title: string;
};

const Layout = (props: LayoutProps): JSX.Element => (
    <>
        <Toolbar title={props.title} />
        <main>{props.children}</main>
    </>
);

export default Layout;
