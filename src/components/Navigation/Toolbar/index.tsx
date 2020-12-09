import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import { AlgorithmType } from '../../../App';
import { AppActionTypes } from '../../../store/app/types';
import { SpeedType } from '../../../utils/types/graph-algorithms/alg-speed-type';
import NavigationItems from '../NavigationItems';

type ToolbarProps = {
    title: string;
    selectedAlg: AlgorithmType;
    running: boolean;
    setSelectedAlg: (alg: AlgorithmType) => AppActionTypes;
    changeRunningState: (state: boolean) => AppActionTypes;
    resetGraphForRunningAlg: () => void;
    clearApp: () => void;
    changeAlgSpeed: (newValue: SpeedType) => void;
};

const Toolbar = (props: ToolbarProps): JSX.Element => (
    <header>
        <Navbar bg="dark" variant="dark" expand="lg">
            <Navbar.Brand href="/">{props.title}</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <NavigationItems
                    running={props.running}
                    selectedAlg={props.selectedAlg}
                    setSelectedAlg={props.setSelectedAlg}
                    changeApprunningState={props.changeRunningState}
                    clearApp={props.clearApp}
                    resetGraphForAlg={props.resetGraphForRunningAlg}
                    changeAlgSpeed={props.changeAlgSpeed}
                />
            </Navbar.Collapse>
        </Navbar>
    </header>
);

export default Toolbar;
