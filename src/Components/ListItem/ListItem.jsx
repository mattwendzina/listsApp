import React from 'react';
import { useDrag } from 'react-dnd';
import { ItemTypes } from '../../Constants/dragAndDrop';
import { AiFillDelete } from 'react-icons/ai';
import {
    RiCheckboxBlankCircleLine,
    RiCheckboxCircleLine,
} from 'react-icons/ri';

import classes from './ListItem.module.css';

const ListItem = (props) => {
    const [{ isDragging }, drag] = useDrag({
        item: { type: ItemTypes.ITEM },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
    });

    const deleteOption = props.delete ? (
        <AiFillDelete
            className={classes.delete}
            onClick={() =>
                props.deleteWarningMessage({
                    deleteWarning: true,
                    id: props.id,
                })
            }
        />
    ) : null;

    // Checked Option should only be added when view a list, and not adding a list. Use props.selectedList as a way of checking whether a user is view a list (as opposed to making a new one)
    let checkedOption = null;
    if (props.checked && props.selectedList) {
        checkedOption = (
            <RiCheckboxCircleLine
                className={classes.checked}
                onClick={() =>
                    props.toggleCheck(
                        props.itemId,
                        props.checked,
                        props.selectedList
                    )
                }
            />
        );
    } else if (!props.unchecked && props.selectedList) {
        checkedOption = (
            <RiCheckboxBlankCircleLine
                className={classes.unchecked}
                onClick={() =>
                    props.toggleCheck(
                        props.itemId,
                        props.checked,
                        props.selectedList
                    )
                }
            />
        );
    }

    return (
        <div className={classes.listItemContainer}>
            {deleteOption}
            <li
                className={classes.listItem}
                ref={drag}
                onClick={props.onClick}
                style={{
                    opacity: isDragging ? '0.5' : '1',
                    color: props.checked ? 'red' : 'black',
                    textDecoration: props.checked ? 'line-through' : 'none',
                }}
            >
                {props.label}
            </li>
            {checkedOption}
        </div>
    );
};

export default ListItem;
