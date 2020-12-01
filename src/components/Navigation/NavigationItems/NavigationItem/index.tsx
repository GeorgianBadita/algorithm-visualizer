import React from 'react';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';

export const LINK_TYPE = 'LINK_TYPE';
export const ITEM_TYPE = 'ITEM_TYPE';
export const DIVIDER_TYPE = 'DIVIDER_TYPE';

type NavigationItemProps = {
    navType: typeof LINK_TYPE | typeof ITEM_TYPE | typeof DIVIDER_TYPE;
    href?: string;
    text?: string;
};

const NavigationItem = (props: NavigationItemProps): JSX.Element => {
    let item = null;
    if (props.navType === LINK_TYPE) {
        item = <Nav.Link href={props.href}>{props.text}</Nav.Link>;
    } else if (props.navType === ITEM_TYPE) {
        item = <NavDropdown.Item href={props.href}>{props.text}</NavDropdown.Item>;
    } else if (props.navType === DIVIDER_TYPE) {
        item = <NavDropdown.Divider />;
    }
    return item !== null ? item : <div></div>;
};

export default NavigationItem;
