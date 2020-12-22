import React from 'react';
import GithubStarCount from '../../../components/GithubStarCount';
import classes from './PresentationSection.module.css';

const PresentationSection = (): JSX.Element => {
    return (
        <div className={`section ${classes.presentationSection}`}>
            <h1 className={classes.presentationTitle}>Algorithm Visualizer</h1>
            <h2 className={classes.presentationText}>Experience Beautiful Algorithm Visualizations</h2>
            <GithubStarCount />
        </div>
    );
};

export default PresentationSection;
