import * as actionTypes from '../actions/input';

const initialState = {
    inputText: '',
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ON_TEXT_CHANGE:
            return {
                ...state,
                inputText: action.payload,
            };

        default:
            return state;
    }
};

export default reducer;
