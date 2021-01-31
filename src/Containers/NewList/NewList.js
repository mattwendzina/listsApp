import React, { useState } from 'react';
import { connect } from 'react-redux';

import InputEl from '../../Components/UI/Input/InputEl';
import Button from '../../Components/UI/Button/Button';
import List from '../../Components/List/List';
import { loadAllLists } from '../../store/actions/lists';
import classes from './NewList.module.css';

const NewList = () => {
    const [text, updateText] = useState('');
    const [items, addItem] = useState([]);

    const onTextChange = (event) => updateText(event.target.value);

    const submit = (event) => {
        event.preventDefault();
        if (text) {
            addNewItem();
        }
    };

    const addNewItem = () => {
        const updatedItems = [...items];
        updatedItems.push(text);
        addItem(updatedItems);
        updateText('');
    };

    return (
        <div>
            <form onSubmit={submit}>
                <InputEl
                    value={text}
                    changed={onTextChange}
                    keyUp={(e) => {
                        if (e.key === 'Escape') {
                            updateText('');
                        }
                    }}
                />
                <div className={classes.buttonContainer}>
                    <Button type="submit"> Add Item </Button>
                    <Button
                        type="submit"
                        disabled={items.length < 1 ? true : false}
                    >
                        Create New List
                    </Button>
                </div>
            </form>
            <List modifiers={['newList']} items={items} />
        </div>
    );
};

const mapStateToProps = (state) => ({
    ...state,
});

const mapDispatchToProps = (dispatch) => ({
    getAllLists: (items) => {
        dispatch(loadAllLists(items));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(NewList);
