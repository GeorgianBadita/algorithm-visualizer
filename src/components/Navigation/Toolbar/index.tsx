import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../../assets/images/logo/logo.png';
import classes from './Toolbar.module.css';

const Toolbar = (): JSX.Element => {
    return (
        <>
            <div className={classes.logoDiv}>
                <a href="/">
                    <img className={classes.logo} src={logo}></img>
                </a>
            </div>
            <ul className={classes.menu}>
                <li className={classes.menuHighlight}>
                    <Link to="/graphs">Graphs</Link>
                </li>
                <li className={classes.menuHighlight}>
                    <Link to="/sorting">Sorting</Link>
                </li>
            </ul>
        </>
    );
};

export default Toolbar;
