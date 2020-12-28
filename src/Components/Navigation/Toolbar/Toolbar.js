import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import classes from './toolbar.module.css';

import Input from '../../UI/Input/InputEl';

import { FiEdit2, FiSave } from 'react-icons/fi';
import axios from '../../../axios-shoppingList';

const Toolbar = (props) => {
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

    const submitNewTitle = () => {
        axios
            .patch(`/lists/${props.listId}/.json`, {
                name: title,
            })
            .then(() => props.getLists(props.listId))
            .catch((e) => console.log(e));
        toggleEdit(!editMode);
    };

    const onBlur = (input) => {
        if (input.key && input.key !== 'Enter') {
            return;
        }
        submitNewTitle();
        toggleEdit(!editMode);
    };

    return (
        <header className={classes.appHeader}>
            <div className={classes.headerContainer}>
                {!editMode ? (
                    <h2>{title}</h2>
                ) : (
                    <Input
                        elementType="input"
                        autoFocus="autofocus"
                        blur={onBlur}
                        keyUp={onBlur}
                        value={title}
                        changed={updateTitle}
                        className="headerInput"
                        color="blue"
                    />
                )}
                {!editMode ? (
                    <FiEdit2 className={classes.editIcon} onClick={editTitle} />
                ) : (
                    <FiSave
                        className={classes.saveIcon}
                        onClick={submitNewTitle}
                    />
                )}
            </div>
            <nav>
                <ul className={classes.navItems}>
                    <li className={classes.seeAllLists}>
                        <Link to="/allLists">See all lists</Link>
                    </li>
                    <li
                        className={classes.newList}
                        onClick={props.createNewList}
                    >
                        <a href="/newList">New List</a>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default Toolbar;
