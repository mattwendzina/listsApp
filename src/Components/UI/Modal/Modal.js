import React from 'react';
import classes from './modal.module.css';
import Backdrop from '../Backdrop/Backdrop';

const modal = (props) => {
    return (
        <div>
            <Backdrop showModal={props.showModal} />
            <div
                className={classes.Modal}
                style={{
                    transform: props.showModal
                        ? 'translate(-50%, -50%) scale(1)'
                        : 'translate(-50%) scale(0)',
                }}
            >
                {props.children}
            </div>
        </div>
    );
};

export default modal;
