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
        props.selectedList.items.forEach((item, index) => {
            return items.push(
                <div key={item.id} className={classes.listItem}>
                    {props.newListEditMode && (
                        <input
                            type="checkbox"
                            onClick={() =>
                                props.addItemToNewList(item.name, item.id)
                            }
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
                            item.checked
                                ? classes.checkedItem
                                : classes.uncheckedItem
                        }
                        onClick={() => props.toggleEdit(item.name, item.id)}
                    >
                        {item.name}
                    </li>
                    {item.checked ? (
                        <RiCheckboxCircleLine
                            className={classes.checked}
                            onClick={() =>
                                props.toggleCheck(item.id, index, item.checked)
                            }
                        />
                    ) : (
                        <RiCheckboxBlankCircleLine
                            className={classes.unchecked}
                            onClick={() =>
                                props.toggleCheck(item.id, index, item.checked)
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
