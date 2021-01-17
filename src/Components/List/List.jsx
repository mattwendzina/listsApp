import React from 'react';
import { createClass } from '../../helperFunctions';

import classes from './List.module.css';
import ListItem from '../ListItem/ListItem';

const List = (props) => {
    const listProps = {
        className: createClass(
            'c-list',
            props.modifiers,
            classes ? classes : null
        ),
    };

    return (
        <div>
            <ul {...listProps}>
                {props.items.map((item, idx) => (
                    <ListItem key={idx} label={item} />
                ))}
            </ul>
        </div>
    );
};

export default List;
