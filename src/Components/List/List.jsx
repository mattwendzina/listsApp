import React from 'react';
import { createClass } from '../../helperFunctions';

import classes from './List.module.css';
import ListItem from '../ListItem/ListItem';

const List = (props) => {
    // Check if trying to render a list (rather than creating a new list), and return if selectedList hasn't yet been loaded
    if (props.viewList && !props.selectedList) {
        return null;
    }

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
                    <ListItem
                        onClick={props.onClick}
                        key={props.key || idx}
                        label={item.name}
                        delete
                        deleteWarningMessage={props.deleteWarningMessage}
                        checked={item.checked}
                        toggleCheck={props.toggleCheck}
                        selectedList={props.selectedList}
                        itemId={item.itemId}
                    />
                ))}
            </ul>
        </div>
    );
};

export default List;
