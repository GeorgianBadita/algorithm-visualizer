import React from 'react';
import classes from './GithubStarCount.module.css';

const GithubStarCount = (): JSX.Element => {
    return (
        <iframe
            title="GithubStars"
            className={classes.gitHubStarsButton}
            tabIndex={-1}
            src={
                'https://ghbtns.com/github-btn.html?user=georgianBadita&repo=algorithm-visualizer&type=star&count=true&size=large'
            }
            frameBorder={'0'}
            scrolling={'0'}
            width={'162px'}
            height={'30px'}
        ></iframe>
    );
};

export default GithubStarCount;
