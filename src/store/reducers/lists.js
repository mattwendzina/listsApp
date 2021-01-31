import * as actionTypes from '../actions/lists';

const initialState = {
    allLists: null,
    errorMessage: null,
    selectedList: null,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.LOAD_ALL_LISTS:
            return {
                ...state,
                allLists: action.payload,
                errorMessage: null,
            };
        case actionTypes.LOAD_ALL_LISTS_FAILURE:
            return {
                ...state,
                errorMessage: action.message,
            };
        case actionTypes.SET_LIST:
            return {
                ...state,
                selectedList: action.payload,
            };
        default:
            return state;
    }
};

export default reducer;
