export const ON_TEXT_CHANGE = 'ON_TEXT_CHANGE';

export const onTextChange = (event) => {
    return {
        type: ON_TEXT_CHANGE,
        payload: event.target.value,
    };
};
