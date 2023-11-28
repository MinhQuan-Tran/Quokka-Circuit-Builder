import React, {PropsWithChildren} from 'react';
import styles from './FormLabel.module.scss';

interface FormLabelProps {
    label? : string;
}

const FormLabel : React.FC<FormLabelProps> = (props: PropsWithChildren<FormLabelProps>) => {
    const {label, children} = props;
    return <h2 className={styles.formLabel}>{label}</h2>
}

export default FormLabel;
