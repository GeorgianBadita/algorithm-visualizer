import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../../assets/images/logo/logo.png';
import linkedinWhite from '../../../assets/icons/linkedinWhite.png';
import linkedinBlue from '../../../assets/icons/linkedinBlue.png';
import { withRouter } from 'react-router-dom';

import classes from './Toolbar.module.css';

const Toolbar = withRouter(
    (props): JSX.Element => {
        console.log(props.location);
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
                    <Link to="/home">
                        <img className={classes.logo} src={logo}></img>
                    </Link>
                </div>
                <ul className={classes.menu}>
                    {props.location.pathname !== '/home' ? (
                        <li className={classes.menuHighlight}>
                            <Link to="/home">Home</Link>
                        </li>
                    ) : null}

                    <li className={classes.menuHighlight}>
                        <Link to="/graphs">Graphs</Link>
                    </li>
                    <li className={classes.menuHighlight}>
                        <Link to="/sorting">Sorting</Link>
                    </li>
                    <li
                        className={classes.linkedin}
                        onMouseEnter={(_) => handleOnMouseEnter()}
                        onMouseLeave={(_) => handleOnMouseLeave()}
                    >
                        <a href={'https://www.linkedin.com/in/marin-georgian/'} target="_blank">
                            <img height={'40px'} width={'40px'} src={currentLinkedinIcon} />
                        </a>
                    </li>
                </ul>
            </div>
        );
    },
);

export default Toolbar;
