import * as actionTypes from '../actions/items';
import helpers from '../../helperFunctions';

const initialState = {
    newItem: {
        elementType: 'input',
        elementConfig: {
            type: 'text',
            placeholder: 'New Item',
        },
        value: { id: helpers.randomId(), name: null, checked: false },
    },
    inputText: '',
    deleteWarning: false,
    itemToEdit: null,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ON_DELETE_WARNING:
            return {
                ...state,
                deleteWarning: action.payload,
            };
        case actionTypes.ON_DELETE_CONFIRMED:
            return {
                ...state,
                deleteWarning: false,
            };
        case actionTypes.ON_TOGGLE_EDIT:
            let itemToEdit;
            if (action.payload && action.payload.name) {
                itemToEdit = {
                    name: action.payload.name,
                    id: action.payload.id,
                    itemId: action.payload.itemId,
                };
            } else {
                itemToEdit = null;
            }
            return {
                ...state,
                itemToEdit: itemToEdit,
            };
        // case actionTypes.ADD_ITEM:
        //     return {
        //         ...state,
        //         newItem: {
        //             ...state.newItem,
        //             elementConfig: {
        //                 ...state.newItem.elementConfig,
        //             },
        //             value: {
        //                 ...state.newItem.value,
        //                 name: action.name,
        //                 checked: true,
        //             },
        //         },
        //     };
        default:
            return state;
    }
};

export default reducer;
