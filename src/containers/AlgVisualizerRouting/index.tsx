import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import GraphContainerAlgorithms from '../GraphContainerAlgorithms';
import { SortingContainerAlgorithms } from '../SortingContainerAlgorithms';

/**
 * Routing component
 */
const AlgVisualizerRouting = (): JSX.Element => (
    <>
        <Switch>
            <Route path={'/graphs'} exact component={GraphContainerAlgorithms} />
            <Route path={'/sorting'} exact component={SortingContainerAlgorithms} />
            <Redirect to={'/graphs'} />
        </Switch>
    </>
);

export default AlgVisualizerRouting;
