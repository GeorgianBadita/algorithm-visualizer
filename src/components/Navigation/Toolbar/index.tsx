import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import NavigationItems from '../NavigationItems';

type ToolbarProps = {
    title: string;
};

const Toolbar = (props: ToolbarProps): JSX.Element => (
    <header>
        <Navbar bg="dark" variant="dark" expand="lg">
            <Navbar.Brand href="/">{props.title}</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <NavigationItems />
            </Navbar.Collapse>
        </Navbar>
    </header>
);

export default Toolbar;
