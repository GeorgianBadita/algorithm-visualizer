import React from 'react';
import NavDropdown from 'react-bootstrap/esm/NavDropdown';
import Nav from 'react-bootstrap/Nav';
import { AlgorithmType, GraphAlgoirhtmsType, NO_ALGORITHM } from '../../../App';
import { AppActionTypes } from '../../../store/app/types';
import NavigationItem, { LINK_TYPE, ITEM_TYPE, BUTTON_TYPE } from './NavigationItem';

type NavigationItemsProps = {
    selectedAlg: GraphAlgoirhtmsType;
    setSelectedAlg: (alg: AlgorithmType) => AppActionTypes;
    changeApprunningState: (state: boolean) => AppActionTypes;
};

const NavigationItems = (props: NavigationItemsProps): JSX.Element => {
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
            </NavDropdown>
            <NavigationItem
                navType={BUTTON_TYPE}
                text={props.selectedAlg === NO_ALGORITHM ? 'Choose an Algorithm' : (props.selectedAlg as string)}
                changeApprunningState={props.changeApprunningState}
                selectedAlg={props.selectedAlg}
            />
        </Nav>
    );
};

export default NavigationItems;
