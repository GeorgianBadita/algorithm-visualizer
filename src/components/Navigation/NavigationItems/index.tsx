import React from 'react';
import Nav from 'react-bootstrap/Nav';

import { LINK_TYPE } from '../../../utils/types/graph-types/navigation-item-type';
import NavigationItem from './NavigationItem';

const NavigationItems = (): JSX.Element => {
    return (
        <>
            <Nav className="mr-auto">
                <NavigationItem href={'/home'} navType={LINK_TYPE} text={'Home'} />
            </Nav>
            <Nav className="ml-auto">
                <NavigationItem href={'/graphs'} navType={LINK_TYPE} text={'Graphs'} />
                <NavigationItem href={'/sorting'} navType={LINK_TYPE} text={'Sorting'} />
            </Nav>
        </>
    );
};

export default NavigationItems;
