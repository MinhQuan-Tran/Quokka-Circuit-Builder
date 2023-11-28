import React, { PropsWithChildren} from "react";
import styles from './Form.module.scss';
import { FormContext } from "./FormContext";
import FormInput from "./FormInput/FormInput";
import {ErrorMessage, useField, Formik,  Form as FormikForm} from "formik";
import FormButton from "./FormButton/FormButton";
import FormLabel from "./FormLabel/FormLabel";
interface FormProps {
    label: string;
    name : string;
}


const Form = (props: PropsWithChildren<FormProps>) => {
    const {name, label, children} = props;
    const [field, meta, helpers] = useField<string[]>(name);

    return  (
        <FormikForm className={styles.form}>
            <FormContext.Provider value={{field, meta, helpers}}>
                {children}
            </FormContext.Provider>
        </FormikForm>
    )
}


export default Object.assign(Form, {FormLabel, FormInput, FormButton})

