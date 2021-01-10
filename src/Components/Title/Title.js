import React, { useState, useEffect } from 'react';
import classes from './Title.module.css';
import { FiEdit2, FiSave } from 'react-icons/fi';
import InputEl from '../UI/Input/InputEl';

const Title = (props) => {
    const [editMode, toggleEdit] = useState(false);
    const [title, changeTitle] = useState();

    useEffect(
        function loadTitle() {
            changeTitle(props.listName);
        },
        [props]
    );

    const updateTitle = (e) => {
        changeTitle(e.target.value);
    };

    const editTitle = () => {
        toggleEdit(!editMode);
    };

    const onUpdateTitle = (input) => {
        if (
            (input.key && input.key === 'Enter') ||
            input.type === 'mousedown'
        ) {
            props.setNewTitle(props.listId, title);
            toggleEdit(!editMode);
        }
        if (input.key && input.key === 'Escape') {
            toggleEdit(!editMode);
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
                    value={title}
                    changed={updateTitle}
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
