import React from 'react';
import classes from './InputEl.module.css';

const InputEl = (props) => {
    let inputElement = null;

    const createClass = () => {
        const propClassNames = ['inputElement', props.className]
            .map((classname) => classes[classname])
            .join(' ');

        return propClassNames;
    };

    switch (props.elementType) {
        case 'input':
            inputElement = (
                <input
                    className={createClass()}
                    {...props.elementConfig}
                    value={props.value}
                    onChange={props.changed}
                    autoFocus={props.autoFocus}
                    onClick={props.click}
                    onKeyUp={props.keyUp}
                    onBlur={props.blur}
                />
            );
            break;
        case 'textArea':
            inputElement = (
                <textarea
                    className={classes.inputElement}
                    {...props.elementConfig}
                    value={props.value}
                    onChange={props.changed}
                />
            );
            break;
        default:
            inputElement = (
                <input
                    className={classes.inputElement}
                    {...props.elementConfig}
                    value={props.value}
                    onChange={props.changed}
                    autoFocus={props.autoFocus}
                    onClick={props.click}
                    onKeyUp={props.keyUp}
                    onBlur={props.blur}
                />
            );
    }
    return (
        <div className={classes.input}>
            {props.label && (
                <label className={classes.label}>{props.label}</label>
            )}
            {inputElement}
        </div>
    );
};

export default InputEl;
