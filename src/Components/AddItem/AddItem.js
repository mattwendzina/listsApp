import React from 'react';

import classes from './AddItem.module.css';
import InputEl from '../UI/Input/InputEl';

const AddItem = (props) => {
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

    const inputElementsArray = [];
    for (let key in props.inputElements) {
        inputElementsArray.push({
            id: key,
            config: props.inputElements[key],
        });
    }

    return !props.newListEditMode ? (
        <div className={classes.addItemContainer}>
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
                <input
                    type="input"
                    id="input"
                    onChange={props.input}
                    onKeyDown={props.submit}
                    value={props.value}
                />
            )}
            {props.editMode.edit ? (
                <button onClick={props.update}>Update</button>
            ) : (
                <button onClick={props.submit}>Submit</button>
            )}
        </div>
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

export default AddItem;
