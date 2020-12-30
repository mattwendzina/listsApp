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
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
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
        // case actionTypes.DELETE_ITEM:
        //     return {
        //         ...state,
        //     };
        default:
            return state;
    }
};

export default reducer;
