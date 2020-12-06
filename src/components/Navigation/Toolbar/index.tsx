import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import { AlgorithmType } from '../../../App';
import { AppActionTypes } from '../../../store/app/types';
import NavigationItems from '../NavigationItems';

type ToolbarProps = {
    title: string;
    selectedAlg: AlgorithmType;
    setSelectedAlg: (alg: AlgorithmType) => AppActionTypes;
    changeRunningState: (state: boolean) => AppActionTypes;
};

const Toolbar = (props: ToolbarProps): JSX.Element => (
    <header>
        <Navbar bg="dark" variant="dark" expand="lg">
            <Navbar.Brand href="/">{props.title}</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <NavigationItems
                    selectedAlg={props.selectedAlg}
                    setSelectedAlg={props.setSelectedAlg}
                    changeApprunningState={props.changeRunningState}
                />
            </Navbar.Collapse>
        </Navbar>
    </header>
);

export default Toolbar;
