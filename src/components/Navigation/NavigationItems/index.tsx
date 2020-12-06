import React from 'react';
import NavDropdown from 'react-bootstrap/esm/NavDropdown';
import Nav from 'react-bootstrap/Nav';
import NavigationItem, { LINK_TYPE, ITEM_TYPE, BUTTON_TYPE } from './NavigationItem';

const NavigationItems = (): JSX.Element => {
    return (
        <Nav className="mr-auto">
            <NavigationItem navType={LINK_TYPE} href={'/'} text={'Home'} />
            <NavDropdown title="Algorithms" id="basic-nav-dropdown">
                <NavigationItem navType={ITEM_TYPE} href={'/dijkstra'} text={"Dijkstra's Algorithm"} />
                <NavigationItem navType={ITEM_TYPE} href={'/bfs'} text={'Breadth First Search'} />
            </NavDropdown>
            <NavigationItem navType={BUTTON_TYPE} text={'VisualizeAlgorithm'} />
        </Nav>
    );
};

export default NavigationItems;
