import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import logo from '../../../assets/images/logo/logo.png';
import NavigationItems from '../NavigationItems';
import classes from './Toolbar.module.css';

const Toolbar = (): JSX.Element => (
    <header>
        <Navbar className={classes.navbarHeader} expand="lg">
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Brand className={classes.brand}>
                <a href="/">
                    <img className={classes.logo} src={logo}></img>
                </a>
            </Navbar.Brand>
            <Navbar.Collapse id="basic-navbar-nav">
                <NavigationItems />
            </Navbar.Collapse>
        </Navbar>
    </header>
);

export default Toolbar;
