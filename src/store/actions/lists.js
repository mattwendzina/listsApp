import axios from '../../axios-shoppingList';

export const LOAD_ALL_LISTS = 'LOAD_ALL_LISTS';
export const LOAD_ALL_LISTS_FAILURE = 'LOAD_ALL_LISTS_FAILURE';
export const SET_LIST = 'SET_LIST';

export const loadAllListsRequest = (result) => {
    return {
        type: LOAD_ALL_LISTS,
        payload: result,
    };
};

export const loadAllListsFailure = (result) => {
    return {
        type: LOAD_ALL_LISTS_FAILURE,
        message: result,
    };
};

export const loadAllLists = (listId) => {
    return (dispatch) => {
        axios.get('/lists.json').then((res) => {
            if (!res.data) {
                return dispatch(loadAllListsFailure('Failed to load lists'));
            }
            dispatch(loadAllListsRequest(res.data));
            dispatch(setList(res.data, listId));
        });
    };
};

export const setList = (lists, selectedListId) => {
    let listId = selectedListId || Object.keys(lists)[0];
    let { name, items, id } = Object.keys(lists).reduce((list, id) => {
        if (id === selectedListId) {
            return {
                ...list,
                ...lists[id],
            };
        }
        return list;
    }, {});
    if (!selectedListId) {
        id = lists[Object.keys(lists)[0]].id;
        name = lists[Object.keys(lists)[0]].name;
        items = lists[Object.keys(lists)[0]].items;
    }

    return {
        type: SET_LIST,
        payload: { name, items, id, listId },
    };
};

export const setNewTitle = (listId, title) => {
    return (dispatch) => {
        axios
            .patch(`/lists/${listId}/.json`, {
                name: title,
            })
            .then((res) => console.log(res))
            .catch((e) => console.log(e));
    };
};
