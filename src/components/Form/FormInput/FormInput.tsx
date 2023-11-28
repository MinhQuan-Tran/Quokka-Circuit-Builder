import React, {PropsWithChildren} from "react";
import styles from './FormInput.module.scss';
import placeholder from "lodash/fp/placeholder";
interface  FormInputProps {
    inputType : string;
    placeholder?: string;
    defaultValue?: string;
    onChange?: React.ChangeEventHandler<HTMLInputElement>
    onKeyDown?: React.KeyboardEventHandler
}


const FormInput : React.FC<FormInputProps> = (props : PropsWithChildren<FormInputProps>) =>
{
    const { inputType, placeholder, defaultValue,
        onChange, onKeyDown,
        children } = props;

    return (
        <input className={styles.formInput}
               type={inputType}
               placeholder={placeholder}
               defaultValue={defaultValue}
               onChange={onChange}
               onKeyDown={onKeyDown}
        />
    );
}

export default FormInput;
