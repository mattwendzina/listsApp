import React from 'react';
import classes from './ListItem.module.css';

const ListItem = (props) => (
    <li onClick={props.onClick} className={classes.listItem}>
        {props.label}
    </li>
);

export default ListItem;
