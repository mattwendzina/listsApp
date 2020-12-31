import React, { useState, useEffect } from 'react';
import classes from './ListItems.module.css';
import {
    RiCheckboxBlankCircleLine,
    RiCheckboxCircleLine,
} from 'react-icons/ri';
import { AiFillDelete } from 'react-icons/ai';
import Modal from '../UI/Modal/Modal';
import Backdrop from '../UI/Backdrop/Backdrop';
import ConfirmDelete from '../ConfirmDelete/ConfirmDelete';

const ListItems = (props) => {
    const [localCheckedStatus, updateLocalCheckedStatus] = useState();

    // I want to be able to update the checkedItem status instantly, rather than relying on dispatching a reload of the lists from the server as this creates a short delay. Hence using useEffect()
    useEffect(() => {
        updateLocalCheckedStatus(() => {
            const localCheckedStatus = [];
            if (props.selectedList) {
                Object.keys(props.selectedList[1].items).forEach((itemId) => {
                    const { checked } = props.selectedList[1].items[itemId];
                    return localCheckedStatus.push({ itemId, checked });
                });
            }
            return localCheckedStatus;
        });
    }, [props.selectedList]);

    const items = [];
    if (props.selectedList) {
        Object.keys(props.selectedList[1].items).forEach((itemId, idx) => {
            const { name, id, checked } = props.selectedList[1].items[itemId];
            return items.push(
                <div key={id} className={classes.listItem}>
                    {props.newListEditMode && (
                        <input
                            type="checkbox"
                            onClick={() => props.addItemToNewList(name, id)}
                        />
                    )}
                    {!props.newListEditMode && (
                        <AiFillDelete
                            className={classes.delete}
                            onClick={() => props.deleteItemMessage(itemId)}
                        />
                    )}
                    <li
                        className={
                            // When adding a new Item, there is no checkedStatus, hence the first check, then on initial load there is no checked property, hence the check for checkedStatus[idx]
                            localCheckedStatus &&
                            localCheckedStatus[idx] &&
                            localCheckedStatus[idx].checked
                                ? classes.checkedItem
                                : classes.uncheckedItem
                        }
                        onClick={() => props.toggleEdit(name, id)}
                    >
                        {name}
                    </li>
                    {localCheckedStatus &&
                    localCheckedStatus[idx] &&
                    localCheckedStatus[idx].checked ? (
                        <RiCheckboxCircleLine
                            className={classes.checked}
                            onClick={() => {
                                updateLocalCheckedStatus((items) => {
                                    const updatedStatus = items.map((item) => {
                                        if (item.itemId === itemId) {
                                            return {
                                                ...item,
                                                checked: !item.checked,
                                            };
                                        }
                                        return item;
                                    });
                                    return updatedStatus;
                                });
                                props.toggleCheck(
                                    itemId,
                                    checked,
                                    props.selectedList
                                );
                            }}
                        />
                    ) : (
                        <RiCheckboxBlankCircleLine
                            className={classes.unchecked}
                            onClick={() => {
                                updateLocalCheckedStatus((items) => {
                                    const updatedStatus = items.map((item) => {
                                        if (item.itemId === itemId) {
                                            return {
                                                ...item,
                                                checked: !item.checked,
                                            };
                                        }
                                        return item;
                                    });
                                    return updatedStatus;
                                });
                                props.toggleCheck(
                                    itemId,
                                    checked,
                                    props.selectedList
                                );
                            }}
                        />
                    )}
                </div>
            );
        });
    }
    return (
        <div>
            <ul className={classes.listItemsContainer}>{items}</ul>
            <Modal showModal={props.showModal}>
                <ConfirmDelete
                    confirmDelete={() =>
                        props.confirmDelete(props.selectedList)
                    }
                    cancelDelete={props.cancelDelete}
                />
            </Modal>
        </div>
    );
};

export default ListItems;
