import React from 'react';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { LinkContainer } from 'react-router-bootstrap';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import { AppActionTypes } from '../../../../store/app/types';
import {
    BUTTON_TYPE,
    DIVIDER_TYPE,
    ITEM_TYPE,
    LINK_TYPE,
    NavigationItemType,
} from '../../../../utils/types/graph-algorithms/navigation-item-type';
import { NO_ALGORITHM } from '../../../../utils/types/graph-algorithms/algorithm-types';
import { AlgorithmType } from '../../../../App';
import classes from './NavigationItem.module.css';
import { withRouter, RouteComponentProps, Link } from 'react-router-dom';
import NavItem from 'react-bootstrap/esm/NavItem';

type NavigationItemRouterProps = RouteComponentProps<any> & {
    navType: NavigationItemType;
    href?: string;
    text: string;
    changeSelectedAlg?: (alg: AlgorithmType) => AppActionTypes;
    selectedAlg?: AlgorithmType;
    running?: boolean;
    onClick?: () => void;
};

const NavigationItem = withRouter(
    (props: NavigationItemRouterProps): JSX.Element => {
        let item = null;
        if (props.navType === LINK_TYPE) {
            item = <Nav.Link href={props.href}>{props.text}</Nav.Link>;
        } else if (props.navType === ITEM_TYPE) {
            item = (
                <LinkContainer to={props.href || ''}>
                    <NavItem>{props.text}</NavItem>
                </LinkContainer>
            );
        } else if (props.navType === DIVIDER_TYPE) {
            item = <NavDropdown.Divider />;
        } else if (props.navType === BUTTON_TYPE) {
            item = (
                <Form inline>
                    <Button
                        className={classes.toolbarButton}
                        disabled={
                            (props.selectedAlg && props.selectedAlg === NO_ALGORITHM) ||
                            (props.running && props.running === true)
                        }
                        onClick={() => {
                            if (props.onClick) props.onClick();
                        }}
                        variant="primary"
                    >
                        {props.text}
                    </Button>
                </Form>
            );
        }
        return item !== null ? item : <div></div>;
    },
);

export default NavigationItem;
