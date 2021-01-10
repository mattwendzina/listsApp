import React, { useState, useEffect } from 'react';
import classes from './Title.module.css';
import { FiEdit2, FiSave } from 'react-icons/fi';
import InputEl from '../UI/Input/InputEl';

const Title = (props) => {
    const [editMode, toggleEdit] = useState(false);
    const [title, setTitle] = useState();
    const [updatedTitle, changeTitle] = useState();
    const [newTitle, createNewTitle] = useState(false);

    useEffect(
        function loadTitle() {
            setTitle(props.listName);
        },
        [props]
    );

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
            changeTitle('');
        }
        return;
    };
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
            {!editMode ? (
                <FiEdit2 className={classes.editIcon} onClick={editTitle} />
            ) : (
                <FiSave
                    className={classes.saveIcon}
                    onMouseDown={onUpdateTitle}
                />
            )}
        </div>
    );
};

export default Title;
