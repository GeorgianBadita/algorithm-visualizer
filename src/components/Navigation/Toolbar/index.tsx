import React from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import logo from '../../../assets/images/logo/logo.png';
import linkedinWhite from '../../../assets/icons/linkedinWhite.png';
import linkedinBlue from '../../../assets/icons/linkedinBlue.png';
import { withRouter } from 'react-router-dom';

import classes from './Toolbar.module.css';

export interface ToolbarProps extends RouteComponentProps<never> {
    clearApp: () => void;
}

const Toolbar = withRouter(
    (props: ToolbarProps): JSX.Element => {
        const [currentLinkedinIcon, setCurrentLinkedinIcon] = React.useState('');

        React.useEffect(() => {
            setCurrentLinkedinIcon(linkedinWhite);
        }, []);

        const handleOnMouseEnter = () => {
            setCurrentLinkedinIcon(linkedinBlue);
        };

        const handleOnMouseLeave = () => {
            setCurrentLinkedinIcon(linkedinWhite);
        };

        return (
            <div className={classes.toolbar}>
                <div className={classes.logoDiv}>
                    <Link onClick={() => props.clearApp()} to="/home">
                        <img alt="Logo" className={classes.logo} src={logo}></img>
                    </Link>
                </div>
                <ul className={classes.menu}>
                    {props.location.pathname !== '/home' ? (
                        <li className={classes.menuHighlight}>
                            <Link onClick={() => props.clearApp()} to="/home">
                                Home
                            </Link>
                        </li>
                    ) : null}

                    <li className={classes.menuHighlight}>
                        <Link onClick={() => props.clearApp()} to="/graphs">
                            Graphs
                        </Link>
                    </li>
                    <li className={classes.menuHighlight}>
                        <Link onClick={() => props.clearApp()} to="/sorting">
                            Sorting
                        </Link>
                    </li>
                    <li
                        className={classes.linkedin}
                        onMouseEnter={() => handleOnMouseEnter()}
                        onMouseLeave={() => handleOnMouseLeave()}
                    >
                        <a
                            onClick={() => props.clearApp()}
                            href={'https://www.linkedin.com/in/marin-georgian/'}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <img alt="LinkedinIcon" height={'40px'} width={'40px'} src={currentLinkedinIcon} />
                        </a>
                    </li>
                </ul>
            </div>
        );
    },
);

export default Toolbar;
