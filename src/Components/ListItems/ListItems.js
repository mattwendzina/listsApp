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
    const {
        selectedList,
        items,
        newListEditMode,
        addItemToNewList,
        deleteItem,
        deleteWarning,
        deleteWarningMessage,
        toggleEdit,
        toggleCheck,
    } = props;
    const [localCheckedStatus, updateLocalCheckedStatus] = useState();
    const [itemToDelete, setItemToDelete] = useState();

    // I want to be able to update the checkedItem status instantly, rather than relying on dispatching a reload of the lists from the server as this creates a short delay. Hence using useEffect()
    useEffect(() => {
        updateLocalCheckedStatus(() => {
            const localCheckedStatus = [];
            if (selectedList) {
                items.forEach(({ checked, id }) => {
                    return localCheckedStatus.push({ id, checked });
                });
            }
            return localCheckedStatus;
        });
    }, [selectedList, items]);

    const formattedItems = [];

    if (selectedList) {
        items.forEach(({ name, id, checked, itemId }, idx) => {
            return formattedItems.push(
                <div key={id} className={classes.listItem}>
                    {newListEditMode && (
                        <input
                            type="checkbox"
                            onClick={() => addItemToNewList(name, id)}
                        />
                    )}
                    {!newListEditMode && (
                        <AiFillDelete
                            className={classes.delete}
                            onClick={() => {
                                deleteItem(deleteWarning);
                                setItemToDelete(() => ({
                                    id,
                                    listId: selectedList.listId,
                                }));
                            }}
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
                        onClick={() => toggleEdit(name, id, itemId)}
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
                                        if (item.id === id) {
                                            return {
                                                ...item,
                                                checked: !item.checked,
                                            };
                                        }
                                        return item;
                                    });
                                    return updatedStatus;
                                });
                                toggleCheck(itemId, checked, selectedList);
                            }}
                        />
                    ) : (
                        <RiCheckboxBlankCircleLine
                            className={classes.unchecked}
                            onClick={() => {
                                updateLocalCheckedStatus((items) => {
                                    const updatedStatus = items.map((item) => {
                                        if (item.id === id) {
                                            return {
                                                ...item,
                                                checked: !item.checked,
                                            };
                                        }
                                        return item;
                                    });
                                    return updatedStatus;
                                });
                                toggleCheck(itemId, checked, selectedList);
                            }}
                        />
                    )}
                </div>
            );
        });
    }
    return (
        <div>
            <ul className={classes.listItemsContainer}>{formattedItems}</ul>
            <Modal showModal={deleteWarning}>
                <ConfirmDelete
                    confirmDelete={() =>
                        deleteItem(deleteWarning, selectedList, itemToDelete)
                    }
                    cancelDelete={() => deleteWarningMessage(false)}
                />
            </Modal>
        </div>
    );
};

export default ListItems;
