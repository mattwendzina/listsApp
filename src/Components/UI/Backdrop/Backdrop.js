import React from 'react';
import classes from './backdrop.module.css';

const Backdrop = (props) => {
    return (
        <div>
            {props.showModal ? <div className={classes.backdrop}> </div> : null}
        </div>
    );
};

export default Backdrop;
