import React, { useEffect, useCallback, useRef } from 'react';
import classes from './InputEl.module.css';

const InputEl = (props) => {
    let inputElement = null;
    const editInputElement = useRef();

    const createClass = () => {
        const propClassNames = ['inputElement', props.className]
            .map((classname) => classes[classname])
            .join(' ');

        return propClassNames;
    };

    // Autofocus behaviour is difficult to activate when switching between items. This solution gets a reference to the input (ie - editInputElement = useRef()) and then updates it everytime there is a change in the input value (ie - `props.value)
    useEffect(() => {
        if (editInputElement.current && editInputElement.current.autofocus) {
            editInputElement.current.focus();
        }
    }, [props.value]);

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
                    ref={editInputElement}
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
        <div className={classes.inputContainer}>
            {props.label && (
                <label className={classes.label}>{props.label}</label>
            )}
            {inputElement}
        </div>
    );
};

export default InputEl;
