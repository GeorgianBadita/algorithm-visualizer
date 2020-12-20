import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import GraphContainerAlgorithms from '../GraphContainerAlgorithms';
import HomePage from '../HomePage';
import SortingContainerAlgorithms from '../SortingContainerAlgorithms';

/**
 * Routing component
 */
const AlgVisualizerRouting = (): JSX.Element => (
    <>
        <Switch>
            <Route path={'/home'} exact component={HomePage} />
            <Route path={'/graphs'} exact component={GraphContainerAlgorithms} />
            <Route path={'/sorting'} exact component={SortingContainerAlgorithms} />
            <Redirect to={'/home'} />
        </Switch>
    </>
);

export default AlgVisualizerRouting;
