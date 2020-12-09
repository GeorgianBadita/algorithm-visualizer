import React from 'react';
import NavDropdown from 'react-bootstrap/esm/NavDropdown';
import Nav from 'react-bootstrap/Nav';
import { AlgorithmType } from '../../../App';
import { AppActionTypes } from '../../../store/app/types';
import { GraphAlgoirhtmsType, NO_ALGORITHM } from '../../../utils/types/graph-algorithms/algorithm-types';
import { LINK_TYPE, ITEM_TYPE, BUTTON_TYPE } from '../../../utils/types/graph-algorithms/navigation-item-type';
import NavigationItem from './NavigationItem';

type NavigationItemsProps = {
    selectedAlg: GraphAlgoirhtmsType;
    running: boolean;
    setSelectedAlg: (alg: AlgorithmType) => AppActionTypes;
    changeApprunningState: (state: boolean) => AppActionTypes;
    clearApp: () => void;
    resetGraphForAlg: () => void;
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

    return (
        <Nav className="mr-auto">
            <NavigationItem navType={LINK_TYPE} href={'/'} text={'Home'} />
            <NavDropdown title="Algorithms" id="basic-nav-dropdown">
                <NavigationItem
                    changeSelectedAlg={props.setSelectedAlg}
                    navType={ITEM_TYPE}
                    text={"Dijkstra's Algorithm"}
                />
                <NavigationItem
                    changeSelectedAlg={props.setSelectedAlg}
                    navType={ITEM_TYPE}
                    text={'Breadth First Search'}
                />
                <NavigationItem changeSelectedAlg={props.setSelectedAlg} navType={ITEM_TYPE} text={'A* Algorithm'} />
                <NavigationItem
                    changeSelectedAlg={props.setSelectedAlg}
                    navType={ITEM_TYPE}
                    text={'Best First Search'}
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
        </Nav>
    );
};

export default NavigationItems;
