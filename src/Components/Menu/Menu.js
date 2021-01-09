import React from 'react';
import { Link } from 'react-router-dom';
import classes from './Menu.module.css';

const Menu = (props) => (
    <nav>
        <ul className={classes.navItems}>
            <li className={classes.seeAllLists}>
                <Link to="/">See all lists</Link>
            </li>
            <li className={classes.newList} onClick={props.createNewList}>
                <a href="/newList">New List</a>
            </li>
        </ul>
    </nav>
);

export default Menu;
