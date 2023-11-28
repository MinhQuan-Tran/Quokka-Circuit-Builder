import React from "react";
import styles from './Input.module.scss';

interface InputProps {
    type: string;
    styleTypes: string[]
    onChange?: React.ChangeEventHandler<HTMLInputElement>
    onKeyDown?: React.KeyboardEventHandler
    placeholder?: string;
    defaultValue? : string;

}

const Input : React.FC<InputProps> = (props) => {
    const {type, styleTypes, onChange, onKeyDown, placeholder, defaultValue} = props;

    return <input type={type}
                  className={styles.input}
                  onChange={onChange}
                  onKeyDown={onKeyDown}
                  placeholder={placeholder}
                  defaultValue={defaultValue}

    >
    </input>
}

export default Input;
