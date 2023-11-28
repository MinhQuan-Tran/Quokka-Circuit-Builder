import React, {PropsWithChildren} from "react";
import styles from './FormButton.module.scss';

interface FormButtonProps {
    label? : string
}

const FormButton : React.FC<FormButtonProps> = (props: PropsWithChildren<FormButtonProps>) => {
    const {label, children} = props;
    return <button className={styles.formButton}>
        {label}
    </button>
}
export default FormButton;
