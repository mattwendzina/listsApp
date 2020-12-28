import * as actionTypes from './actions/actions';
import helpers from '../helperFunctions';
import { RiContactsBookLine } from 'react-icons/ri';

const initialState = {
    newItem: {
        elementType: 'input',
        elementConfig: {
            type: 'text',
            placeholder: 'New Item',
        },
        value: { id: helpers.randomId(), name: null, checked: false },
    },
    input: '',
    listItems: null,
    errorMessage: null,
    selectedList: null,
};

const reducer = (state = initialState, action) => {
    console.log('REDUCER: ', action);
    switch (action.type) {
        case actionTypes.LOAD_ALL_LISTS:
            return {
                ...state,
                listItems: action.payload,
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
        case actionTypes.ADD_ITEM:
            return {
                ...state,
                newItem: {
                    ...state.newItem,
                    elementConfig: {
                        ...state.newItem.elementConfig,
                    },
                    value: {
                        ...state.newItem.value,
                        name: action.name,
                        checked: true,
                    },
                },
            };
        case actionTypes.DELETE_ITEM:
            return {
                ...state,
            };
        default:
            return state;
    }
};

export default reducer;
