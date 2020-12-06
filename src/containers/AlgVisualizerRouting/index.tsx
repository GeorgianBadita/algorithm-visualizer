import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import GraphContainerAlgorithms from '../GraphContainerAlgorithms';

/**
 * Routing component
 */
const AlgVisualizerRouting = (): JSX.Element => (
    <>
        <Switch>
            <Route path={'/'} exact component={GraphContainerAlgorithms} />
            <Redirect to={'/'} />
        </Switch>
    </>
);

export default AlgVisualizerRouting;
