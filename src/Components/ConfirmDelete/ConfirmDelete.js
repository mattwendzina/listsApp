import React from 'react';
import classes from './ConfirmDelete.module.css';
import Button from '../UI/Button/Button';

const ConfirmDelete = (props) => {
    return (
        <div className={classes.confirmDelete}>
            <h3>Are you sure you wish to delete</h3>
            <div className={classes.buttonContainer}>
                <Button onClick={props.confirmDelete}>Yes</Button>
                <Button onClick={props.cancelDelete}>No</Button>
            </div>
        </div>
    );
};

export default ConfirmDelete;
