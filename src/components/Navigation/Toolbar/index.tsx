import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../../assets/images/logo/logo.png';
import linkedinWhite from '../../../assets/icons/linkedinWhite.png';
import linkedinBlue from '../../../assets/icons/linkedinBlue.png';

import classes from './Toolbar.module.css';

const Toolbar = (): JSX.Element => {
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
        <>
            <div className={classes.logoDiv}>
                <Link to="/home">
                    <img className={classes.logo} src={logo}></img>
                </Link>
            </div>
            <ul className={classes.menu}>
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
        </>
    );
};

export default Toolbar;
