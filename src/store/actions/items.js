import axios from '../../axios-shoppingList';
import helpers from '../../helperFunctions';
import { loadAllLists, setList } from './lists';

export const ON_SUBMIT = 'ON_SUBMIT';
export const ON_CHECK = 'ON_CHECK';
export const ON_DELETE_WARNING = 'ON_DELETE_WARNING';
export const ON_DELETE_CONFIRMED = 'ON_DELETE_CONFIRMED';
export const ON_TOGGLE_EDIT = 'ON_TOGGLE_EDIT';
export const ON_TOGGLE_CHECK = 'ON_TOGGLE_CHECK';

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
        return (dispatch) => {
            axios
                .post(`/lists/${selectedList.listId}/items/.json`, {
                    id: helpers.randomId(),
                    name: item.text,
                    checked: false,
                })
                .then((res) => {
                    dispatch(loadAllLists(selectedList.listId));
                })
                .catch((e) => console.log(e));
        };
    }
};

export const toggleCheck = (id, checked, selectedList) => (dispatch) => {
    const updatedItems = Object.keys(selectedList.items).reduce(
        (list, item) => {
            if (id === item) {
                selectedList.items[item].checked = !checked;
                return {
                    ...list,
                    [item]: selectedList.items[item],
                };
            }
            return { ...list, [item]: selectedList.items[item] };
        },
        {}
    );
    const updatedList = {
        ...selectedList,
        items: updatedItems,
    };
    dispatch(setList(updatedList, selectedList.listId));

    axios
        .patch(`/lists/${selectedList.listId}/items/${id}/.json`, {
            checked: !checked,
        })
        .then((res) => {
            dispatch(loadAllLists(selectedList.listId));
        })
        .catch((e) => console.log(e));
};

export const toggleEdit = (name, id, itemId) => {
    const setItemToEdit = name ? { name, id, itemId } : null;
    return {
        type: ON_TOGGLE_EDIT,
        payload: setItemToEdit,
    };
};

export const deleteWarningMessage = (deletionDetalis) => ({
    type: ON_DELETE_WARNING,
    payload: deletionDetalis,
});

export const deleteConfirmed = () => {
    return {
        type: ON_DELETE_CONFIRMED,
    };
};

export const deleteItem = (selectedList, itemToDelete) => (
    dispatch,
    getState
) => {
    const listId = getState().lists.selectedList.listId;
    const updatedList = Object.keys(selectedList.items).reduce(
        (filteredList, itemId) => {
            const item = selectedList.items[itemId];
            if (item.id !== itemToDelete) {
                return {
                    ...filteredList,
                    [itemId]: {
                        id: item.id,
                        name: item.name,
                        checked: item.checked,
                    },
                };
            }
            return filteredList;
        },
        {}
    );

    axios
        .patch(`/lists/${listId}/.json`, {
            items: updatedList,
        })
        .then(() => {
            dispatch(deleteConfirmed());
            dispatch(loadAllLists(itemToDelete.listId));
        })
        .catch((e) => console.log(e));
};
