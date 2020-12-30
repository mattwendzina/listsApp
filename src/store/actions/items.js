import axios from '../../axios-shoppingList';
import helpers from '../../helperFunctions';
import { loadAllLists } from './lists';

export const ON_SUBMIT = 'ON_SUBMIT';

export const onSubmit = (event, item, selectedList) => {
    event.preventDefault();
    return (dispatch) => {
        axios
            .post(`/lists/${selectedList[0]}/items/.json`, {
                id: helpers.randomId(),
                name: item,
                checked: false,
            })
            .then((res) => {
                dispatch(loadAllLists());
            })
            .catch((e) => console.log(e));
    };
};
