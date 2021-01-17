import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { onSubmit, toggleEdit } from '../../store/actions/items';
import classes from './AddItem.module.css';
import InputEl from '../UI/Input/InputEl';
import Button from '../UI/Button/Button';

const AddItem = (props) => {
    const [text, updateText] = useState('');

    useEffect(() => {
        if (props.itemToEdit) {
            updateText(props.itemToEdit.name);
        }
    }, [props.itemToEdit]);

    const onTextChange = (event) => {
        if (event.key === 'Escape') {
            updateText('');
            props.onToggleEdit();
        }
        updateText(event.target.value);
    };

    return (
        <form
            className={classes.addItemContainer}
            onSubmit={(event) => {
                updateText('');
                props.onSubmit(
                    event.currentTarget[1].innerText,
                    event,
                    {
                        text: text,
                        itemId: props.itemToEdit
                            ? props.itemToEdit.itemId
                            : null,
                    },
                    props.selectedList
                );
                props.onToggleEdit();
            }}
        >
            {props.itemToEdit ? (
                <div>
                    <label htmlFor="update">Update Item</label>
                    <InputEl
                        id="update"
                        elementType="input"
                        className="editItem"
                        value={text}
                        changed={onTextChange}
                        keyUp={(e) => {
                            if (e.key === 'Escape') {
                                updateText('');
                                props.onToggleEdit();
                            }
                        }}
                        autoFocus
                    />
                    <div className={classes.buttonContainer}>
                        <Button type="submit">Update</Button>
                        <Button
                            type="button"
                            onClick={() => {
                                updateText('');
                                props.onToggleEdit();
                            }}
                        >
                            Cancel
                        </Button>
                    </div>
                </div>
            ) : (
                <div>
                    <label htmlFor="submit">Add Item</label>
                    <InputEl
                        id="submit"
                        elementType="input"
                        className="addItem"
                        value={text}
                        changed={onTextChange}
                    />
                    <Button type="submit" disabled={text ? false : true}>
                        Add Item
                    </Button>
                </div>
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
        itemToEdit: state.items.itemToEdit,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onSubmit: (type, event, text, selectedList) =>
            dispatch(onSubmit(type, event, text, selectedList)),
        onToggleEdit: () => {
            dispatch(toggleEdit());
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddItem);
