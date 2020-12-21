import React from 'react';
import GithubStarCount from '../../../components/GithubStarCount';
import classes from './PresentationSection.module.css';

export type PresentationSectionProps = { something: string };

const PresentationSection = (props: PresentationSectionProps): JSX.Element => {
    return (
        <div className={`section ${classes.presentationSection}`}>
            <h1 className={classes.presentationTitle}>Algorithm Visualizer</h1>
            <h2 className={classes.presentationText}>Experience Beautiful Algorithm Visualizations</h2>
            <GithubStarCount />
        </div>
    );
};

export default PresentationSection;
