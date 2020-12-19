import React from 'react';
import NavDropdown from 'react-bootstrap/esm/NavDropdown';
import Nav from 'react-bootstrap/Nav';
import { AppActionTypes } from '../../../store/app/types';
import { isGraphAlgorithm } from '../../../utils/graph-utils-functions';
import { AlgorithmType } from '../../../utils/types/app-types/algorithm-classes-types';
import { ITEM_TYPE, BUTTON_TYPE } from '../../../utils/types/graph-types/navigation-item-type';
import NavigationItem from './NavigationItem';

type NavigationItemsProps = {
    selectedAlg: AlgorithmType;
    running: boolean;
    changeApprunningState: (state: boolean) => AppActionTypes;
    resetGraphForAlg: () => void;
};

const NavigationItems = (props: NavigationItemsProps): JSX.Element => {
    const handleOnStateSetToTrue = () => {
        props.changeApprunningState(true);
        if (isGraphAlgorithm(props.selectedAlg)) {
            props.resetGraphForAlg();
        }
    };

    return (
        <Nav className="mr-auto">
            <NavDropdown title="Change algorithm class" id="basic-nav-dropdown">
                <NavigationItem href={'/graphs'} navType={ITEM_TYPE} text={'Graphs'} />
                <NavigationItem href={'/sorting'} navType={ITEM_TYPE} text={'Sorting'} />
            </NavDropdown>

            <NavigationItem
                navType={BUTTON_TYPE}
                text={'Start algorithm'}
                selectedAlg={props.selectedAlg}
                running={props.running}
                onClick={handleOnStateSetToTrue}
            />
        </Nav>
    );
};

export default NavigationItems;
