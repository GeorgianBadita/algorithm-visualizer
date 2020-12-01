import React from 'react';
import Graph from '../../components/Graph';
import classes from './GraphContainerAlgorithms.module.css';

const GraphContainerAlgorithms = (): JSX.Element => {
    return (
        <div className={classes.graphContainerAlgorithms}>
            {
                //alg options
                null
            }
            <Graph height={22} width={58} />
        </div>
    );
};

export default GraphContainerAlgorithms;
