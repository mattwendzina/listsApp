import React from 'react';
import classes from './Button.module.css';

import { createClass } from '../../../helperFunctions';

const Button = (props) => {
    const buttonProps = {
        type: props.type,
        onClick: props.onClick,
        className: createClass(
            'c-button',
            props.modifiers,
            classes ? classes : null
        ),
    };

    if (props.disabled) {
        buttonProps.disabled = true;
    }

    return (
        <div>
            <button {...buttonProps}>{props.children}</button>
        </div>
    );
};

export default Button;
