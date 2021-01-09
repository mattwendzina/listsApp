import axios from '../../axios-shoppingList';
import helpers from '../../helperFunctions';
import { loadAllLists } from './lists';

export const ON_SUBMIT = 'ON_SUBMIT';
export const ON_CHECK = 'ON_CHECK';
export const ON_DELETE_WARNING = 'ON_DELETE_WARNING';
export const ON_DELETE_CONFIRMED = 'ON_DELETE_CONFIRMED';
export const ON_TOGGLE_EDIT = 'ON_TOGGLE_EDIT';

export const onSubmit = (type, event, item, selectedList) => {
    event.preventDefault();
    if (type === 'Update') {
        return (dispatch) => {
            axios
                .patch(
                    `/lists/${selectedList.listId}/items/${item.itemId}/.json`,
                    {
                        name: item.text,
                    }
                )
                .then((res) => {
                    dispatch(loadAllLists());
                })
                .catch((e) => console.log(e));
        };
    } else {
        console.log(`/lists/${selectedList.listId}/items/.json`);
        return (dispatch) => {
            axios
                .post(`/lists/${selectedList.listId}/items/.json`, {
                    id: helpers.randomId(),
                    name: item.text,
                    checked: false,
                })
                .then((res) => {
                    dispatch(loadAllLists());
                })
                .catch((e) => console.log(e));
        };
    }
};

export const toggleCheck = (id, checked, selectedList) => {
    return (dispatch) => {
        axios
            .patch(`/lists/${selectedList.listId}/items/${id}/.json`, {
                checked: !checked,
            })
            .then((res) => {
                dispatch(loadAllLists());
            })
            .catch((e) => console.log(e));
    };
};

export const toggleEdit = (name, id, itemId) => {
    const setItemToEdit = name ? { name, id, itemId } : null;
    return {
        type: ON_TOGGLE_EDIT,
        payload: setItemToEdit,
    };
};

export const deleteWarningMessage = (deleteMessageWarning) => {
    return {
        type: ON_DELETE_WARNING,
        payload: deleteMessageWarning,
    };
};

export const deleteConfirmed = () => {
    return {
        type: ON_DELETE_CONFIRMED,
    };
};

export const deleteItem = (deleteWarning, selectedList, itemToDelete) => {
    return (dispatch) => {
        if (!deleteWarning) {
            return dispatch(deleteWarningMessage(true));
        }
        // When 'items' is passed to ListItems.js as a prop, it's formed so that it includes itemId. The shape of data stored in Firebase is as such that it needs reshaping so that when the list is updated it's shape stays the same.
        const formattedList = Object.keys(selectedList.items).map((itemId) => {
            const { name, id, checked } = selectedList.items[itemId];
            return { itemId, name, id, checked };
        });

        const updatedList = formattedList.reduce((filteredList, item) => {
            if (item.id !== itemToDelete.id) {
                return {
                    ...filteredList,
                    [item.itemId]: {
                        id: item.id,
                        name: item.name,
                        checked: item.checked,
                    },
                };
            }
            return filteredList;
        }, {});
        axios
            .patch(`/lists/${itemToDelete.listId}/.json`, {
                items: updatedList,
            })
            .then(() => {
                dispatch(deleteConfirmed());
                dispatch(loadAllLists());
            })
            .catch((e) => console.log(e));
    };
};
