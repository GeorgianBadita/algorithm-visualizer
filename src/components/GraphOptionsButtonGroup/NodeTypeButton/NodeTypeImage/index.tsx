import React from 'react';
import classes from './NodeTypeImage.module.css';

type NodeTypeImageProps = {
    image: string;
    altTxt: string;
};

const NodeTypeImage = (props: NodeTypeImageProps): JSX.Element => {
    return (
        <div className={classes.nodeTypeImage}>
            <img src={props.image} alt={props.altTxt} />
        </div>
    );
};

export default NodeTypeImage;
