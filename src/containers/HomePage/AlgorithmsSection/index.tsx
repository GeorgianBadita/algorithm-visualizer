import React from 'react';
import classes from './AlgorithmsSection.module.css';
import AlgorithmClassCard from './AlgorithmClassCard';

const algorithmTexts = [
    {
        color: '#306BAC',
        algTitle: 'Graph Algorithms',
        algText: 'Explore the main pathfinding algorithms',
        linkTo: '/graphs',
        textColor: '#fff',
    },
    {
        color: '#DDC9B4',
        algTitle: 'Sorting Algorithms',
        algText: 'Explore the main sorting algorithms',
        linkTo: '/sorting',
        textColor: '#000',
    },
];

const AlgorithmsSection = (): JSX.Element => {
    return (
        <div className={`section ${classes.algorithmsSection}`}>
            {algorithmTexts.map((el) => (
                <div className={'slide'} key={el.algText}>
                    <AlgorithmClassCard
                        key={el.algTitle}
                        color={el.color}
                        algTitle={el.algTitle}
                        algText={el.algText}
                        linkTo={el.linkTo}
                        textColor={el.textColor}
                    />
                </div>
            ))}
        </div>
    );
};

export default AlgorithmsSection;
