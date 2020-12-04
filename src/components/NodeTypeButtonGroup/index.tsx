import React from 'react';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import NodeTypeButton from './NodeTypeButton';
import classes from './NodeTypeButtonGroup.module.css';
import startArrow from '../../assets/images/startArrow.png';
import destination from '../../assets/images/destination.png';
import wall from '../../assets/images/wall.png';
import weight from '../../assets/images/weight.png';
import simple from '../../assets/images/simple.png';

type ButtonData = {
    text: string;
    image: string;
    active: boolean;
};

const initButtons: ButtonData[] = [
    {
        text: 'Add wall nodes',
        image: wall,
        active: false,
    },
    {
        text: 'Add weighted nodes',
        image: weight,
        active: false,
    },
    {
        text: 'Add simple nodes',
        image: simple,
        active: false,
    },
    {
        text: 'Move source node',
        image: startArrow,
        active: false,
    },
    {
        text: 'Move destination node',
        image: destination,
        active: false,
    },
];

type NodeTypeButtonGroupProps = {
    onWallNodeTypeClick?: () => void;
    onWeightNodeTypeClick?: () => void;
    onSimpleNodeTypeClick?: () => void;
    onSourceNodeTypeClick?: () => void;
    onDestinationNodeTypeClick?: () => void;
};

const NodeTypeButtonGroup = (props: NodeTypeButtonGroupProps): JSX.Element => {
    const [activeKeyButton, setActiveKeyButton] = React.useState('');

    const getInitButtons = (): JSX.Element[] => {
        return initButtons.map((buttonData) => (
            <NodeTypeButton
                key={buttonData.text}
                text={buttonData.text}
                image={buttonData.image}
                active={buttonData.text === activeKeyButton ? true : false}
                oncClick={setActiveKeyButton}
            />
        ));
    };

    return (
        <div className={classes.nodeTypeButtonGroup}>
            <ButtonGroup className={classes.buttons}>{getInitButtons()}</ButtonGroup>
        </div>
    );
};

export default NodeTypeButtonGroup;
