import React from 'react';
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
    const items = [];
    if (props.selectedList) {
        Object.keys(props.selectedList[1].items).forEach((item, index) => {
            const { name, id, checked } = props.selectedList[1].items[item];
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
                            onClick={() => props.deleteItemMessage(item)}
                        />
                    )}
                    <li
                        className={
                            checked
                                ? classes.checkedItem
                                : classes.uncheckedItem
                        }
                        onClick={() => props.toggleEdit(name, id)}
                    >
                        {name}
                    </li>
                    {checked ? (
                        <RiCheckboxCircleLine
                            className={classes.checked}
                            onClick={() =>
                                props.toggleCheck(id, index, checked)
                            }
                        />
                    ) : (
                        <RiCheckboxBlankCircleLine
                            className={classes.unchecked}
                            onClick={() =>
                                props.toggleCheck(id, index, checked)
                            }
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
