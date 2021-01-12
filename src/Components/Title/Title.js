import React, { useState, useEffect } from 'react';
import classes from './Title.module.css';
import { FiEdit2, FiSave } from 'react-icons/fi';
import InputEl from '../UI/Input/InputEl';

const Title = (props) => {
    const [editMode, toggleEdit] = useState(false);
    const [title, setTitle] = useState();
    const [updatedTitle, changeTitle] = useState();
    const [newTitle, createNewTitle] = useState(false);

    useEffect(() => setTitle(props.title), [props]);

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
        changeTitle(title);
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

    let editButton = null;

    if (props.listId) {
        if (!editMode) {
            editButton = (
                <FiEdit2 className={classes.editIcon} onClick={editTitle} />
            );
        } else {
            editButton = (
                <FiSave
                    className={classes.saveIcon}
                    onMouseDown={onUpdateTitle}
                />
            );
        }
    }

    return (
        <div className={classes.titleContainer}>
            {!editMode ? (
                <h2>{title}</h2>
            ) : (
                <InputEl
                    elementType="input"
                    autoFocus="autofocus"
                    onBlur={onUpdateTitle}
                    keyUp={onUpdateTitle}
                    value={updatedTitle || (newTitle ? '' : title)}
                    changed={updateTitleText}
                    className="titleInput"
                />
            )}
            {editButton}
        </div>
    );
};

export default Title;
