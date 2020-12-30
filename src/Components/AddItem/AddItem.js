import React, { useState } from 'react';
import { connect } from 'react-redux';
import { onSubmit } from '../../store/actions/items';

import classes from './AddItem.module.css';
import InputEl from '../UI/Input/InputEl';

const AddItem = (props) => {
    const [text, updateText] = useState('');

    const inputChangedHandler = (event, inputIdentifier) => {
        const updatedInputForm = {
            ...props.inputElements,
        };
        // Needed in order to deep clone the object
        const updatedFormElement = {
            ...updatedInputForm[inputIdentifier],
        };
        updatedFormElement.value = event.target.value;
        updatedInputForm[inputIdentifier] = updatedFormElement;
        props.inputElements[inputIdentifier] =
            updatedInputForm[inputIdentifier];
    };

    const onTextChange = (event) => updateText(event.target.value);
    // const onBlur = (input) => {
    //     if (input.key && input.key !== 'Enter') {
    //         return;
    //     }
    //     submitNewTitle();
    // };

    const inputElementsArray = [];
    for (let key in props.inputElements) {
        inputElementsArray.push({
            id: key,
            config: props.inputElements[key],
        });
    }

    return !props.newListEditMode ? (
        <form
            className={classes.addItemContainer}
            onSubmit={(event) => onSubmit(event, text, props.selectedList)}
        >
            <label htmlFor="input">Add Item</label>
            {props.editMode.edit ? (
                <input
                    type="input"
                    id="input"
                    onChange={props.input}
                    onKeyDown={props.update}
                    value={props.value}
                />
            ) : (
                <InputEl
                    elementType="input"
                    className="addItem"
                    value={text}
                    changed={onTextChange}
                />
            )}
            {props.editMode.edit ? (
                <button onClick={props.update}>Update</button>
            ) : (
                <button
                    onClick={(event) => {
                        props.onSubmit(event, text, props.selectedList);
                        updateText('');
                    }}
                >
                    Submit
                </button>
            )}
        </form>
    ) : (
        <div className={classes.newListInputContainer}>
            {inputElementsArray.map((inputElement) => {
                if (inputElement.id === 'newList') {
                    return (
                        <InputEl
                            key={inputElement.id}
                            elementType={inputElement.config.elementType}
                            elementConfig={inputElement.config.elementConfig}
                            value={inputElement.config.value}
                            changed={(event) =>
                                inputChangedHandler(event, inputElement.id)
                            }
                        />
                    );
                }
            })}
            {/* <InputEl elementType="..." elementConfig="..." value="..." /> */}
            <button onClick={props.submitNewList}>Create new List!</button>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        inputText: state.input.inputText,
        selectedList: state.lists.selectedList,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onSubmit: (event, text, selectedList) =>
            dispatch(onSubmit(event, text, selectedList)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddItem);
