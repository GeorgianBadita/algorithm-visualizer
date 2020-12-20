import React from 'react';

import { Link } from 'react-router-dom';
import { AppActionTypes } from '../../../../store/app/types';
import { LINK_TYPE, NavigationItemType } from '../../../../utils/types/graph-types/navigation-item-type';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { AlgorithmType } from '../../../../utils/types/app-types/algorithm-classes-types';

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
            item = (
                <Link className={'nav-link'} to={props.href || '/home'}>
                    {props.text}
                </Link>
            );
        }
        return item !== null ? item : <div></div>;
    },
);

export default NavigationItem;
