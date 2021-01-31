import React from 'react';

import classes from './ListItems.module.css';
import Modal from '../UI/Modal/Modal';
import ConfirmDelete from '../ConfirmDelete/ConfirmDelete';
import ListItem from '../ListItem/ListItem';

const ListItems = ({
    selectedList,
    items,
    itemToDelete,
    deleteItem,
    deleteWarning,
    deleteWarningMessage,
    toggleEdit,
    toggleCheck,
}) => (
    <div>
        <ul className={classes.listItemsContainer}>
            {selectedList &&
                items.map(({ name, id, checked, itemId }) => (
                    <ListItem
                        id={id}
                        label={name}
                        delete
                        deleteWarningMessage={deleteWarningMessage}
                        onClick={() => toggleEdit(name, id, itemId)}
                        checked={checked}
                        toggleCheck={toggleCheck}
                        selectedList={selectedList}
                        itemId={itemId}
                    />
                ))}
        </ul>

        <Modal showModal={deleteWarning}>
            <ConfirmDelete
                confirmDelete={() => deleteItem(selectedList, itemToDelete)}
                cancelDelete={() => deleteWarningMessage(false)}
            />
        </Modal>
    </div>
);

export default ListItems;
