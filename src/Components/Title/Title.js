import React, { useState, useEffect } from 'react';
import classes from './Title.module.css';
import { FiEdit2, FiSave } from 'react-icons/fi';
import InputEl from '../UI/Input/InputEl';

const Title = (props) => {
    const [editMode, toggleEdit] = useState(false);
    const [title, setTitle] = useState();
    const [updatedTitle, changeTitle] = useState();
    const [newTitle, createNewTitle] = useState(false);

    useEffect(() => setTitle(props.listName), [props]);

    const updateTitleText = (e) => {
        createNewTitle(false);
        changeTitle(e.target.value);
        if (
            (updatedTitle && updatedTitle.length <= 2) ||
            e.target.value === ''
        ) {
            createNewTitle(true);
        }
    };

    const editTitle = () => {
        toggleEdit(!editMode);
    };

    const onUpdateTitle = (input) => {
        if (
            (input.key && input.key === 'Enter') ||
            input.type === 'mousedown'
        ) {
            props.setNewTitle(props.listId, updatedTitle);
            setTitle(updatedTitle);
            toggleEdit(!editMode);
        }
        if ((input.key && input.key === 'Escape') || input.type === 'blur') {
            toggleEdit(!editMode);
            createNewTitle(false);
            changeTitle('');
        }
        return;
    };

    let header = <h2>{title}</h2>;
    let editButton = null;

    if (props.listId && editMode) {
        header = (
            <InputEl
                elementType="input"
                autoFocus="autofocus"
                onBlur={onUpdateTitle}
                keyUp={onUpdateTitle}
                value={updatedTitle || (newTitle ? '' : title)}
                changed={updateTitleText}
                className="titleInput"
            />
        );
    }

    if (props.listId && !editMode) {
        editButton = (
            <FiEdit2 className={classes.editIcon} onClick={editTitle} />
        );
    } else if (props.listId && editMode) {
        editButton = (
            <FiSave className={classes.saveIcon} onMouseDown={onUpdateTitle} />
        );
    }

    return (
        <div className={classes.titleContainer}>
            {header}
            {editButton}
        </div>
    );
};

export default Title;
