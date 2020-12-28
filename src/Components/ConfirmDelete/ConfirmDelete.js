import React from 'react';
import classes from './ConfirmDelete.module.css';

const ConfirmDelete = (props) => {
    return (
        <div className={classes.confirmDelete}>
            <h3>Are you sure you wish to delete</h3>
            <div className={classes.buttonContainer}>
                <button onClick={props.confirmDelete}>Yes</button>
                <button onClick={props.cancelDelete}>No</button>
            </div>
        </div>
    );
};

export default ConfirmDelete;
