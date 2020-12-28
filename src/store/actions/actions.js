import axios from '../../axios-shoppingList';
export const ADD_ITEM = 'ADD_ITEM';
export const DELETE_ITEM = 'DELETE_ITEM';
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

export const loadAllLists = () => {
    return (dispatch) => {
        axios.get('/lists.json').then((res) => {
            if (!res.data) {
                return dispatch(loadAllListsFailure('Failed to load lists'));
            }
            dispatch(loadAllListsRequest(res.data));
            // dispatch(setList());
        });
    };
};

export const setList = (lists, listId) => {
    let selectedListId = listId;
    let selectedList = lists[selectedListId];

    if (!listId) {
        selectedListId = Object.keys(lists)[0];
        selectedList = lists[selectedListId];
    }

    return {
        type: SET_LIST,
        payload: selectedList,
    };
};
