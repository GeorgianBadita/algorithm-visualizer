import React from 'react';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export const LINK_TYPE = 'LINK_TYPE';
export const ITEM_TYPE = 'ITEM_TYPE';
export const DIVIDER_TYPE = 'DIVIDER_TYPE';
export const BUTTON_TYPE = 'BUTTON_TYPE';

export type NavigationItemType = typeof LINK_TYPE | typeof ITEM_TYPE | typeof DIVIDER_TYPE | typeof BUTTON_TYPE;

type NavigationItemProps = {
    navType: NavigationItemType;
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
    } else if (props.navType === BUTTON_TYPE) {
        item = (
            <Form inline>
                <Button className="mr-auto" onClick={() => console.log('SMTH')} variant="primary">
                    {props.text}
                </Button>
            </Form>
        );
    }
    return item !== null ? item : <div></div>;
};

export default NavigationItem;
