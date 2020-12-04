import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import NodeTypeButtonGroup from '../../components/NodeTypeButtonGroup';
import GraphContainerAlgorithms from '../GraphContainerAlgorithms';

/**
 * Routing component
 */
const AlgVisualizerRouting = (): JSX.Element => (
    <>
        <NodeTypeButtonGroup />
        <Switch>
            <Route path={'/'} exact component={GraphContainerAlgorithms} />
            <Redirect to={'/'} />
        </Switch>
    </>
);

export default AlgVisualizerRouting;
