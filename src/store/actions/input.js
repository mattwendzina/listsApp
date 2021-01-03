export const ON_TEXT_CHANGE = 'ON_TEXT_CHANGE';
export const ON_CLEAR_TEXT = 'ON_CLEAR_TEXT';

export const onTextChange = (event) => {
    return {
        type: ON_TEXT_CHANGE,
        payload: event.target.value,
    };
};

export const onClearText = () => {
    return {
        type: ON_CLEAR_TEXT,
    };
};
