import React from 'react';
import { Pane } from 'evergreen-ui';
import classes from './AlgorithmClassCard.module.css';
import { RouteComponentProps } from 'react-router-dom';
import { withRouter } from 'react-router-dom';

export type AlgorithmClassCardProps = Record<string, never>;

export type AlgorithmClassCardRouterProps = RouteComponentProps<AlgorithmClassCardProps> & {
    color: string;
    algTitle: string;
    algText: string;
    linkTo: string;
    textColor: string;
};

const AlgorithmClassCard = withRouter(
    (props: AlgorithmClassCardRouterProps): JSX.Element => {
        return (
            <Pane
                className={classes.pane}
                backgroundColor={props.color}
                hoverElevation={4}
                elevation={1}
                width={'50%'}
                height={'50%'}
                marginLeft={'auto'}
                marginRight={'auto'}
                display="flex"
                justifyContent="center"
                alignItems="center"
                flexDirection="column"
                onClick={() => props.history.push(props.linkTo)}
            >
                <h1 style={{ color: props.textColor }} className={classes.algorithmTitle}>
                    {props.algTitle}
                </h1>
                <h2 style={{ color: props.textColor }} className={classes.algorithmText}>
                    {props.algText}
                </h2>
            </Pane>
        );
    },
);

export default AlgorithmClassCard;
