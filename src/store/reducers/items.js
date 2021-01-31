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
    itemToDelete: '',
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ON_DELETE_WARNING:
            return {
                ...state,
                deleteWarning: action.payload.deleteWarning,
                itemToDelete: action.payload.id,
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
        default:
            return state;
    }
};

export default reducer;
