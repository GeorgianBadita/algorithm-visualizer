import React from 'react';
import Toolbar from '../../components/Navigation/Toolbar';
import classes from './Layout.module.css';

type LayoutProps = {
    children: React.ReactNode[] | React.ReactNode;
    title: string;
};

const Layout = (props: LayoutProps): JSX.Element => (
    <>
        <Toolbar title={props.title} />
        <main className={classes.content}>{props.children}</main>
    </>
);

export default Layout;
