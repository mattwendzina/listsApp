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

const ListItems = ({
    selectedList,
    items,
    itemToDelete,
    deleteItem,
    deleteWarning,
    deleteWarningMessage,
    toggleEdit,
    toggleCheck,
}) => {
    const formattedItems = [];

    selectedList &&
        items.forEach(({ name, id, checked, itemId }) => {
            return formattedItems.push(
                <div key={id} className={classes.listItem}>
                    <AiFillDelete
                        className={classes.delete}
                        onClick={() =>
                            deleteWarningMessage({ deleteWarning: true, id })
                        }
                    />
                    <li
                        className={
                            checked
                                ? classes.checkedItem
                                : classes.uncheckedItem
                        }
                        onClick={() => toggleEdit(name, id, itemId)}
                    >
                        {name}
                    </li>
                    {checked ? (
                        <RiCheckboxCircleLine
                            className={classes.checked}
                            onClick={() =>
                                toggleCheck(itemId, checked, selectedList)
                            }
                        />
                    ) : (
                        <RiCheckboxBlankCircleLine
                            className={classes.unchecked}
                            onClick={() =>
                                toggleCheck(itemId, checked, selectedList)
                            }
                        />
                    )}
                </div>
            );
        });

    return (
        <div>
            <ul className={classes.listItemsContainer}>{formattedItems}</ul>
            <Modal showModal={deleteWarning}>
                <ConfirmDelete
                    confirmDelete={() => deleteItem(selectedList, itemToDelete)}
                    cancelDelete={() => deleteWarningMessage(false)}
                />
            </Modal>
        </div>
    );
};

export default ListItems;
