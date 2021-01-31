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

export const loadAllLists = (listId) => (dispatch) => {
    axios.get('/lists.json').then((res) => {
        if (!res.data) {
            return dispatch(loadAllListsFailure('Failed to load lists'));
        } else {
            dispatch(loadAllListsRequest(res.data));
            if (localStorage.getItem('listId')) {
                dispatch(
                    setList(
                        res.data[localStorage.getItem('listId')],
                        localStorage.getItem('listId')
                    )
                );
            }
        }
    });
};

export const setList = (selectedList, listId) => {
    return {
        type: SET_LIST,
        payload: { ...selectedList, listId: listId },
    };
};

export const setNewTitle = (listId, title) => (dispatch) => {
    axios
        .patch(`/lists/${listId}/.json`, {
            name: title,
        })
        .then((res) => console.log(res))
        .catch((e) => console.log(e));
};
