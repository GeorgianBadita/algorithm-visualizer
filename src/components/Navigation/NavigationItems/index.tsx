import React from 'react';
import NavDropdown from 'react-bootstrap/esm/NavDropdown';
import Nav from 'react-bootstrap/Nav';
import { AlgorithmType } from '../../../App';
import { AppActionTypes } from '../../../store/app/types';
import { SpeedType } from '../../../utils/types/graph-algorithms/alg-speed-type';
import { GraphAlgoirhtmsType, NO_ALGORITHM } from '../../../utils/types/graph-algorithms/algorithm-types';
import { LINK_TYPE, ITEM_TYPE, BUTTON_TYPE } from '../../../utils/types/graph-algorithms/navigation-item-type';
import { algNameToAlgType, speedStrTpSpeed } from '../../../utils/utilsFunctions';
import NavigationItem from './NavigationItem';

type NavigationItemsProps = {
    selectedAlg: GraphAlgoirhtmsType;
    running: boolean;
    setSelectedAlg: (alg: AlgorithmType) => AppActionTypes;
    changeApprunningState: (state: boolean) => AppActionTypes;
    clearApp: () => void;
    resetGraphForAlg: () => void;
    changeAlgSpeed: (newValue: SpeedType) => void;
};

const NavigationItems = (props: NavigationItemsProps): JSX.Element => {
    const handleOnStateSetToTrue = () => {
        props.changeApprunningState(true);
        props.resetGraphForAlg();
    };

    const clear = () => {
        props.changeApprunningState(false);
        props.clearApp();
    };

    const changeAlg = (newValue: string) => {
        if (props.selectedAlg) props.setSelectedAlg(algNameToAlgType(newValue));
    };

    const changeSpeed = (newValue: string) => {
        if (props.changeAlgSpeed) props.changeAlgSpeed(speedStrTpSpeed(newValue));
    };

    return (
        <Nav className="mr-auto">
            <NavigationItem navType={LINK_TYPE} href={'/'} text={'Home'} />
            <NavDropdown title="Algorithms" id="basic-nav-dropdown">
                <NavigationItem
                    changeSelectedAlg={props.setSelectedAlg}
                    navType={ITEM_TYPE}
                    text={"Dijkstra's Algorithm"}
                    onClick={changeAlg}
                />
                <NavigationItem
                    changeSelectedAlg={props.setSelectedAlg}
                    navType={ITEM_TYPE}
                    text={'Breadth First Search'}
                    onClick={changeAlg}
                />
                <NavigationItem
                    changeSelectedAlg={props.setSelectedAlg}
                    navType={ITEM_TYPE}
                    text={'A* Algorithm'}
                    onClick={changeAlg}
                />
                <NavigationItem
                    changeSelectedAlg={props.setSelectedAlg}
                    navType={ITEM_TYPE}
                    text={'Best First Search'}
                    onClick={changeAlg}
                />
            </NavDropdown>
            <NavigationItem
                navType={BUTTON_TYPE}
                text={props.selectedAlg === NO_ALGORITHM ? 'Choose an Algorithm' : (props.selectedAlg as string)}
                selectedAlg={props.selectedAlg}
                running={props.running}
                onClick={handleOnStateSetToTrue}
            />
            <NavigationItem running={props.running} navType={BUTTON_TYPE} text={'Clear Graph'} onClick={clear} />
            <NavDropdown title="Speed" id="basic-nav-dropdown">
                <NavigationItem navType={ITEM_TYPE} text={'Low Speed'} onClick={changeSpeed} />
                <NavigationItem navType={ITEM_TYPE} text={'Medium Speed'} onClick={changeSpeed} />
                <NavigationItem navType={ITEM_TYPE} text={'High Speed'} onClick={changeSpeed} />
            </NavDropdown>
        </Nav>
    );
};

export default NavigationItems;
